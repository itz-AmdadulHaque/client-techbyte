"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";

const AddToCart = ({
    variant,
    id,
    type,
    count,
    successResponse,
}: {
    variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
    id: string;
    type: string;
    count: number;
    successResponse?: () => void;
}) => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const router = useRouter();


    const handleAddToCart = async ({
        id,
        type,
        count = 1,

    }: {
        id: string;
        type: string;
        count: number;

    }) => {
        if (!auth.accessToken) {
            router.push(`/login?type=${type}&slug=${id}`);
            throw new Error("Please login to continue");
        }

        const res = await axiosPrivate.post("/cart", { type, itemId: id, count });
        return res.data;
    };

    const { mutate: addToCart, isPending } = useMutation({
        mutationKey: ["addToCart"], // 🔑 shared across ALL instances
        mutationFn: handleAddToCart,
        onSuccess: (data) => {
            toast.success(data.message, { position: "top-center" });
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
            successResponse?.();
        },
        onError: (error: { response?: { data?: { message?: string } }; message?: string }) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An unexpected error occurred";
            toast.error(errorMessage, { position: "top-center" });
        },
    });

    return (
        <Button
            variant={variant}
            onClick={() => addToCart({ id, type, count })}
            disabled={isPending} // 🔒 disables ALL AddToCart buttons globally
        >
            {isPending ? "ADDING..." : "ADD TO CART"}
        </Button>
    );
};

export default AddToCart;
