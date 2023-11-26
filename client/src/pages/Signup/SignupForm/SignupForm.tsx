import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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

import apiErrorHandler from "@/utils/apiErrorHandler";

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
    const navigate = useNavigate();
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values: Schema) => {
        setIsSubmitting(true);
        const { fullName, phone, email, password } = values;

        try {
            await axios.post(`${API_BASE_URL}/auth/register`, {
                fullName,
                phone,
                email,
                password,
            });

            form.reset();
            toast({
                duration: 3000,
                title: "Successfully registered",
            });

            navigate("/login");
        } catch (error) {
            let errorMsg: string | null =
                "Unexpected Error Occured, try again later";

            if (axios.isAxiosError(error)) {
                const axiosError: AxiosError<RegisterErrorResponse> = error;

                errorMsg = apiErrorHandler(axiosError);
            } else {
                console.error("Non-Axios error occurred:", error);
            }

            setIsSubmitting(false);
            toast({
                duration: 5000,
                variant: "destructive",
                title: "Failed registration process",
                ...(errorMsg && { description: errorMsg }),
            });
        }
    };

    return (
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Fill up form</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <fieldset disabled={isSubmitting}>
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
                    </fieldset>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SignupForm;
