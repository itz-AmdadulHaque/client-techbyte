"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React, { useState } from "react";
import { CloudDownload } from "lucide-react";

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

    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");

    const handleAddToCart = async ({
        id,
        type,
        count = 1,
        description,
    }: {
        id: string;
        type: string;
        count: number;
        description?: string;
    }) => {
        if (!auth.accessToken) {
            router.push(`/login?type=${type}&slug=${id}`);
            throw new Error("Please login to continue");
        }

        const res = await axiosPrivate.post("/cart", {
            type,
            itemId: id,
            count,
            description: type === "service" ? description : undefined,
        });
        return res.data;
    };

    const { mutate: addToCart, isPending } = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: handleAddToCart,
        onSuccess: (data) => {
            
            toast.success(data.message, { position: "top-center" });
            queryClient.setQueryData(["cartInfo"], () => data.data);
            successResponse?.();
            setOpen(false);
            setDescription("");
        },
        onError: (error: { response?: { data?: { message?: string } }; message?: string }) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "An unexpected error occurred";
            toast.error(errorMessage, { position: "top-center" });
        },
    });

    if (type === "service") {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant={variant} disabled={isPending}>
                        {isPending ? "ADDING..." : "ADD TO CART"}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <h3 className="text-lg font-semibold">Add Service</h3>
                    <textarea
                        placeholder="Write description for this service..."
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                        className="mt-2 p-2"
                    />
                    <Button
                        onClick={() => addToCart({ id, type, count, description })}
                        className="mt-3 w-full"
                        disabled={isPending}
                    >
                        {isPending ? "ADDING..." : "CONFIRM & ADD"}
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }

    // Regular product
    return (
        <Button
            variant={variant}
            onClick={() => addToCart({ id, type, count })}
            disabled={isPending}
        >
            {isPending ? "ADDING..." : "ADD TO CART"}
        </Button>
    );
};

export default AddToCart;
