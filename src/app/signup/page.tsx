"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const SignupSchema = z.object({
    firstname: z.string().nonempty("First name is required"),
    lastname: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .nonempty("Password is required"),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const result = await response.json();
            setSuccessMessage(result.message);
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again." + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-xl font-bold mb-4">Create an Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                            id="firstname"
                            {...register("firstname")}
                            placeholder="Enter your first name"
                        />
                        {errors.firstname && (
                            <p className="text-sm text-red-500">{errors.firstname.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                            id="lastname"
                            {...register("lastname")}
                            placeholder="Enter your last name"
                        />
                        {errors.lastname && (
                            <p className="text-sm text-red-500">{errors.lastname.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>
                    {successMessage && (
                        <p className="text-sm text-green-500">{successMessage}</p>
                    )}
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
