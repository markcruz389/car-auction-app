import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
    return (
        <Card className="w-[450px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col">
                <div className="mb-2 w-full flex justify-end">
                    <Button>Login</Button>
                </div>
                <div>
                    <span>Don't have an account yet?</span>{" "}
                    <Link to="/signup">Sign-up</Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default LoginForm;
