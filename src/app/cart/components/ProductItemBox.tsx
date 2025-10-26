"use client";

import ItemCounter from '@/components/custom/ItemCounter/ItemCounter';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import { ProductCartItemType } from '@/Types/ComponentTypes'
import { useMutation } from '@tanstack/react-query';
import { Trash, Trash2, X } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner';

const ProductItemBox = ({ product }: { product: ProductCartItemType }) => {

    const [count, setCount] = useState(product.quantity);
    const axiosPrivate = useAxiosPrivate();


    const updateCart = async (updateType: string) => {

        const newQuantity = updateType === "+" ? count + 1 : count - 1;
        await axiosPrivate.put(`/cart/product/${product.id}`, { quantity: newQuantity });
        return updateType;
    };


    const removeItem = async () => {

        const res = await axiosPrivate.delete(`/cart/product/${product.id}`);
        return res;
    };

    const { mutate: updateCount } = useMutation({
        mutationKey: ["updateCart"],
        mutationFn: updateCart,
        onSuccess: (data) => {

            setCount((prev) => data === "+" ? prev + 1 : prev - 1);
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });

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

    console.log(product);

    return (
        <div className='border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center relative group'>
            <Image
                height={70}
                width={70}
                className='w-20 h-20 object-contain'
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.product.images[0].image}`}
                alt={product.product.title}
            />


            <div>
                <h2 className='text-xl font-semibold'>{product.product.title}</h2>

                {product.product.price
                    ?
                    <p className="text-md mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                        <span>{product.product.price}</span>
                    </p>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                }


            </div>
            <div className="ml-auto">
                <ItemCounter
                    initialValue={count}
                    onChange={(val) => {
                        if (val > count) {
                            updateCount("+");
                        } else if (val < count) {
                            updateCount("-");
                        }
                    }} />
            </div>

            <button
                type="button"
                onClick={() => removeProductItem()}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
                ✕
            </button>
        </div>
    )
}

export default ProductItemBox