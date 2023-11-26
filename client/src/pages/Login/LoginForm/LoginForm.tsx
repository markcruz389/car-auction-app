import { useState } from "react";
import { Link } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

import {
    Card,
    CardTitle,
    CardHeader,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import apiErrorHandler from "@/utils/apiErrorHandler";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
type Schema = z.infer<typeof formSchema>;

const LoginForm = () => {
    const { toast } = useToast();
    const form = useForm<Schema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [isLoggingIn, setIsLogginIn] = useState(false);

    const onSubmit = async (values: Schema) => {
        setIsLogginIn(true);
        const { email, password } = values;

        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                {
                    email,
                    password,
                }
            );

            form.reset();
            toast({
                duration: 3000,
                title: "Successfully Logged in",
            });
        } catch (error) {
            let errorMsg: string | null =
                "Unexpected Error Occured, try again later";

            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError = error;
                errorMsg = apiErrorHandler(axiosError);
            } else {
                console.error("Non-Axios error occurred:", error);
            }

            setIsLogginIn(false);
            toast({
                duration: 5000,
                variant: "destructive",
                title: "Failed Logging in",
                ...(errorMsg && { description: errorMsg }),
            });
        }
    };

    return (
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <fieldset disabled={isLoggingIn}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </fieldset>
                </Form>
            </CardContent>
            <CardFooter className="w-100 flex justify-center">
                <div>
                    <span>Don't have an account yet?</span>{" "}
                    <Link to="/signup">Sign-up</Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
