"use client";

import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import React from 'react'
import { toast } from 'sonner';

const AddToCart = ({ variant, id, type }: { variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost", id: string, type: string }) => {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const router = useRouter();

    const handleAddToCart = async () => {

        console.log(auth);
        if (auth.accessToken) {
            const res = await axiosPrivate.post("/cart", { type, itemId: id })
            return res.data;
        }
        else {
            router.push(`/login?type=${type}&slug=${id}`)
            throw new Error("Please login to continue")
        }
    }

    const { mutate: addToCart, isPending } = useMutation({
        mutationFn: handleAddToCart,
        onSuccess: (data) => {

            toast.success(data.message, { position: 'top-center' });

        },
        onError: (error: { response: { data: { message: string } }, message?: string }) => {
            const errorMessage = error?.response?.data?.message || error?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Login failed:", error);
        },
    });

    return (
        <Button variant={variant} onClick={() => addToCart()} disabled={isPending}>ADD TO CART</Button>
    )
}

export default AddToCart