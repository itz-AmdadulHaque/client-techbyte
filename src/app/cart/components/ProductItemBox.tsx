"use client";

import ItemCounter from '@/components/custom/ItemCounter/ItemCounter';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import { ProductCartItemType } from '@/Types/ComponentTypes' 
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { toast } from 'sonner';
import { AxiosError, AxiosResponse } from 'axios';


// --- UTILITY: Properly Typed Debounce Function ---
// T extends unknown[] ensures we only accept array types for arguments (e.g., [number]).
// R is the return type of the function being debounced (void for side-effects).
type DebouncedFunction<T extends unknown[], R> = (...args: T) => R;
type DebouncedReturn<T extends unknown[]> = (...args: T) => void;

const debounce = <T extends unknown[]>(
    func: DebouncedFunction<T, void>, // The function passed in returns void
    delay: number
): DebouncedReturn<T> => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // The function execution is synchronous (it just triggers the mutation)
      func(...args); 
      timeoutId = null;
    }, delay);
  };
};

// --- PROPS for ProductItemBox ---
interface ProductItemBoxProps {
    product: ProductCartItemType;
    isLoading: boolean;
    setIsLoading: (st: boolean) => void;
}

// --- COMPONENT DEFINITION ---
const ProductItemBox = ({ product, isLoading, setIsLoading }: ProductItemBoxProps) => {

    const [count, setCount] = useState<number>(product.quantity);
    const axiosPrivate = useAxiosPrivate();

    const updateCart = async (newQuantity: number): Promise<number> => {
        console.log("API CALL: updating cart to quantity", newQuantity);
        
        await axiosPrivate.put(`/cart/product/${product.id}`, { quantity: newQuantity });
        return newQuantity;
    };

    // 1. Replaced 'any' with AxiosResponse for standard API return
    const removeItem = async (): Promise<AxiosResponse> => { 
        const res = await axiosPrivate.delete(`/cart/product/${product.id}`);
        return res;
    };

    // Typing the useMutation hook result for cart update
    const { mutate: mutateUpdateCount } = useMutation<
        number, // TData: The return value of updateCart (new quantity)
        AxiosError<{ message: string }>, // TError: Expected error structure
        number // TVariables: The input to updateCart (newQuantity)
    >({
        mutationKey: ["updateCart"],
        mutationFn: updateCart,
        onSuccess: (newQuantity: number) => {
            setCount(newQuantity); 
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
            setIsLoading(false);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Update failed:", error);
            setIsLoading(false);
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
        },
    });

    // Typing the useMutation hook result for item removal
    const { mutate: removeProductItem } = useMutation<
        AxiosResponse, // 2. Replaced 'any' with AxiosResponse
        AxiosError<{ message: string }>, 
        void // TVariables: The input to removeItem (none needed)
    >({
        mutationKey: ["removeCartItem"],
        mutationFn: removeItem,
        onSuccess: () => {
            toast.success("Item removed", { position: 'top-center' });
            queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, { position: 'top-center' });
            console.error("Removal failed:", error);
        },
    });

    // 3. Constrained generic parameter T to be [number] and R to be void for the debounce utility
    const debouncedUpdateCart = useCallback(
        debounce<[number]>( (newQuantity: number) => {
            setIsLoading(true);
            // This triggers the promise, but the call to mutate is synchronous (returns void).
            mutateUpdateCount(newQuantity);
        }, 500), 
        [mutateUpdateCount, setIsLoading]
    );

    const handleCountChange = (newValue: number): void => {
        setCount(newValue);
        debouncedUpdateCart(newValue);
    };

    const finalPrice: number | null = product?.product?.price
        ? new Date() < new Date(product.product.expiresAt)
            ? product.product.price - product.product.discount
            : product.product.price
        : null;

    return (
        <div className='border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center relative group'>
            {/* ... component structure remains ... */}
            <Image
                height={70}
                width={70}
                className='w-20 h-20 object-contain'
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.product.images[0].image}`}
                alt={product.product.title}
            />


            <div>
                <h2 className='text-xl font-semibold'>{product.product.title}</h2>

                {finalPrice !== null
                    ?
                    <p className="text-md mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                        <span>{finalPrice}</span>
                    </p>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                }


            </div>
            <div className="ml-auto">
                <ItemCounter
                    value={count} 
                    onChange={handleCountChange} 
                    loading={isLoading}
                    />
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