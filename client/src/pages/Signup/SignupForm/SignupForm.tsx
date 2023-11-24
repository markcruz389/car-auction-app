import { Link } from "react-router-dom";

import {
    Card,
    CardTitle,
    CardHeader,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignupForm = () => {
    return (
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Fill up form</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="fullName">Full name</Label>
                            <Input id="fullName" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Signup</Button>
            </CardFooter>
        </Card>
    );
};

export default SignupForm;
