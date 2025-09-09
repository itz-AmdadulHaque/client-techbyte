'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

const EditServiceDescription = ({ id, serviceDescription }: { serviceDescription: string, id: string }) => {

    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState(serviceDescription);
    const axiosPrivate = useAxiosPrivate();

    const updateCart = async () => {

        const res = await axiosPrivate.put(`/cart/service/${id}`, { description });
        return res;
    };

    const { mutate: updateService, isPending } = useMutation({
        mutationKey: ["updateCartService"],
        mutationFn: updateCart,
        onSuccess: () => {

            toast.success("Service item updated", { position: 'top-center' });
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
            setDescription("");
            setOpen(false)

        },
        onError: (error: { response: { data: { message: string } } }) => {
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Update failed:", error);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className='bg-muted absolute -top-1 -right-1 p-1 rounded-full hover:cursor-pointer'
                >
                    <Pencil size={12} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <p className="text-lg font-semibold">Edit Description</p>
                </DialogTitle>

                <textarea
                    placeholder="Write description for this service..."
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    className="mt-2 p-2"
                />
                <Button
                    onClick={() => updateService()}
                    className="mt-3 w-full"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Save"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default EditServiceDescription