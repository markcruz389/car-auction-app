import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

import {
    Card,
    CardTitle,
    CardHeader,
    CardDescription,
    CardContent,
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

const formSchema = z
    .object({
        fullName: z.string().min(1),
        phone: z.string().max(15).min(1),
        email: z.string().email(),
        password: z.string().min(6),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords don't match",
        path: ["confirm"],
    });
const API_BASE_URL = "http://localhost:8080/api/v1";

type Schema = z.infer<typeof formSchema>;
type RegisterErrorResponse = {
    error: {
        message: string;
    };
};

const SignupForm = () => {
    const { toast } = useToast();
    const form = useForm<Schema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirm: "",
        },
    });

    const onSubmit = async (values: Schema) => {
        const { fullName, phone, email, password } = values;
        let title,
            description: string = "";
        let isSuccess = true;

        try {
            await axios.post(`${API_BASE_URL}/auth/register`, {
                fullName,
                phone,
                email,
                password,
            });

            title = "Successfully registered";
            form.reset();
        } catch (error) {
            isSuccess = false;
            title = "Failed account registration";
            description = "Server connection error, try again later";

            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError<RegisterErrorResponse> = error;

                if (axiosError.response) {
                    console.error(
                        "Server responded with non-2xx status:",
                        axiosError.response.status
                    );
                    console.error("Response data:", axiosError.response.data);

                    description = `${axiosError.response.status}: ${error.message}`;
                } else if (axiosError.request) {
                    console.error("No response received from the server");
                } else {
                    console.error(
                        "Error setting up the request:",
                        axiosError.message
                    );
                }
            } else {
                console.error("Non-Axios error occurred:", error);
            }
        }

        toast({
            duration: 5000,
            variant: isSuccess ? "default" : "destructive",
            title,
            description,
        });
    };

    return (
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Fill up form</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
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

                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
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
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
