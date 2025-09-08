"use client";

import ItemCounter from '@/components/custom/ItemCounter/ItemCounter';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import { ProductItemType } from '@/Types/ComponentTypes'
import { useMutation } from '@tanstack/react-query';
import { Trash, Trash2, X } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner';

const ServiceItemBox = ({ service }: { service: ProductItemType }) => {

    const [count, setCount] = useState(service.quantity);
    const axiosPrivate = useAxiosPrivate();

    console.log(service);


    const updateCart = async (updateType: string) => {

        const newQuantity = updateType === "+" ? count + 1 : count - 1;
        await axiosPrivate.put(`/cart/service/${service.id}`, { quantity: newQuantity });
        return updateType;
    };


    const removeItem = async () => {

        const res = await axiosPrivate.delete(`/cart/service/${service.id}`);
        return res;
    };

    const { mutate: updateCount } = useMutation({
        mutationKey: ["updateCart"],
        mutationFn: updateCart,
        onSuccess: (data) => {

            setCount((prev) => data === "+" ? prev + 1 : prev - 1);

        },
        onError: (error: { response: { data: { message: string } } }) => {
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Update failed:", error);
        },
    });


    const { mutate: removeProductItem } = useMutation({
        mutationKey: ["removeCartItem"],
        mutationFn: removeItem,
        onSuccess: (data) => {

            toast.success("Item removed", { position: 'top-center' });
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });

        },
        onError: (error: { response: { data: { message: string } } }) => {
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Update failed:", error);
        },
    });

    return (
        <div className='border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center relative group'>
            <Image
                height={70}
                width={70}
                className='w-20 h-20 object-contain'
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service.service.images[0].image}`}
                alt={service.service.title}
            />


            <div>
                <h2 className='text-xl font-semibold'>{service.service.title}</h2>

                {service.service.price
                    ?
                    <p className="text-md mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                        <span>{service.service.price}</span>
                    </p>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                }


            </div>
            

            <button
                type="button"
                onClick={() => removeProductItem()}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
                ✕
            </button>
        </div>
    )
}

export default ServiceItemBox