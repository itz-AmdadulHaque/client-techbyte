"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { axiosPrivate } from '@/config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from "zod";

const resetPasswordSchema = z.object({
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters long")
        .refine((val) => {
            return /^(?=.*[A-Z])/.test(val);
        }, "Password must contain at least one uppercase letter")
        .refine((val) => {
            return /^(?=.*[a-z])/.test(val);
        }, "Password must contain at least one lowercase letter")
        .refine((val) => {
            return /^(?=.*[0-9])/.test(val);
        }, "Password must contain at least one number"),

    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const searchParams = useSearchParams();

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""

        },
    });



    const resetPasswordFn = async (data: ResetPasswordFormValues) => {

        const passResetValues = { password: data.password, otp: searchParams.get('otp'), email: searchParams.get("email") }


        const res = await axiosPrivate.post("/auth/new-password", passResetValues);
        console.log(res);

        return res.data;
    }


    const { mutate: resetPasswordFunction, isPending } = useMutation({
        mutationFn: resetPasswordFn,
        onSuccess: (data) => {

            toast.success(data.message, { position: 'top-center' });


            router.push('/login')


        },
        onError: (error: { response: { data: { message: string } } }) => {

            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Login failed:", error);
        },
    });


    const onSubmit = async (data: ResetPasswordFormValues) => {
        resetPasswordFunction(data);
    };

    return (
        <div className="container mx-auto flex flex-col gap-16 justify-center items-center min-h-screen ">

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
                </CardHeader>
                <CardContent>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">


                            <div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        className="pr-[46px]"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        {...field}
                                                        disabled={form?.formState?.isSubmitting}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted-foreground/5 rounded-l-none"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>



                            <div>
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        className="pr-[46px]"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Re enter your password"
                                                        {...field}
                                                        disabled={form?.formState?.isSubmitting}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted-foreground/5 rounded-l-none"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>



                            <Button disabled={isPending} type="submit" className="w-full">
                                {
                                    isPending ? "Sending..." : "Submit"
                                }
                            </Button>
                        </form>
                    </Form>


                </CardContent>
            </Card>

        </div>
    )
}

export default ResetPasswordForm