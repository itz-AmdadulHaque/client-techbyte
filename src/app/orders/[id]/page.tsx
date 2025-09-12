"use client"
import AuthCheck from '@/components/custom/AuthCheck';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { cn } from '@/lib/utils';
import { ProductCartItemType, ProductOrderItemType, ServiceItemType } from '@/Types/ComponentTypes';
import { useQuery } from '@tanstack/react-query';
import { Loader, Loader2, Minus, MoveLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react'
import ProductItemBox from './components/ProductItem';
import ServiceItemBox from './components/ServiceItemBox';
import Image from 'next/image';

export default function OrderInfo({ params }: { params: Promise<{ id: string }> }) {
    return <AuthCheck className="">
        <OrderDetails params={params}></OrderDetails>
    </AuthCheck>

}

const OrderDetails = ({ params }: { params: Promise<{ id: string }> }) => {

    const [productOpen, setProductOpen] = useState(true)
    const [serviceOpen, setServiceOpen] = useState(true)
    const [productRequestOpen, setProductRequestOpen] = useState(true)


    const axiosPrivate = useAxiosPrivate();

    const getOrderDetails = async () => {
        const res = await axiosPrivate.get(`/orders/${(await params).id}`);

        return res.data.data;
    }

    const { data: orderDetails, refetch: handleGetOrderDetails, isPending } = useQuery({
        queryKey: ['get-orders'],
        queryFn: getOrderDetails,
    });

    const products = orderDetails?.productItems ?? [];
    const services = orderDetails?.serviceItems ?? [];
    const productRequests = orderDetails?.productRequests ?? [];

    const { totalPrice, allProductHasPrice } = useMemo(() => {
        let total = 0;
        let allHasPrice = true;

        for (const productItem of products) {
            if (!productItem.product.price) {
                allHasPrice = false;
            } else {
                total += (Number(productItem.product.price) * productItem.quantity);
            }
        }

        return { totalPrice: total, allProductHasPrice: allHasPrice };
    }, [products]);


    console.log(orderDetails);

    return (

        <div className='container mx-auto min-h-screen'>

            {
                isPending ?
                    <div className='flex w-full justify-center items-center'>
                        <Loader2 className={cn("h-5 w-5 animate-spin text-muted-foreground", "mr-2 h-24 w-24 animate-spin")} />
                    </div>
                    :
                    <div>
                        <div className='flex flex-wrap gap-3 items-center'>

                            <Link href={"/profile?tab=orders"}>
                                <Button><MoveLeft /> Back to orders</Button>
                            </Link>
                            <h1 className='text-2xl font-bold p-6'>Order# {orderDetails?.id}</h1>
                        </div>

                        {/* TODO: status */}


                        <div className='lg:grid grid-cols-4 gap-2'>

                            <div className='col-span-3'>

                                {/* product */}
                                {orderDetails?.productItems?.length > 0 && (
                                    <Collapsible
                                        open={productOpen}
                                        onOpenChange={setProductOpen}
                                        className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
                                    >
                                        <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
                                            <p>Products</p>
                                            {productOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />}
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {orderDetails?.productItems.map((productItem: ProductOrderItemType) => (
                                                <ProductItemBox key={productItem.id} product={productItem} />
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                )}


                                {/* service */}
                                {orderDetails?.serviceItems.length > 0 && (
                                    <Collapsible
                                        open={serviceOpen}
                                        onOpenChange={setServiceOpen}
                                        className='border px-6 py-4 w-full text-left rounded-md bg-muted mt-6'
                                    >
                                        <CollapsibleTrigger className='w-full text-xl font-semibold flex justify-between mb-2'>
                                            <p>Services</p>
                                            {serviceOpen ? <Minus strokeWidth={2.5} /> : <Plus strokeWidth={2.5} />}
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            {orderDetails?.serviceItems.map((serviceItem: ServiceItemType) => (
                                                <ServiceItemBox key={serviceItem.id} service={serviceItem} date={serviceItem.createdAt} />
                                            ))}
                                        </CollapsibleContent>
                                    </Collapsible>
                                )}

                            </div>


                            {/* order summary */}
                            <div>
                                <div className='min-h-96 border-2 m-4 p-4 rounded-md text-sm'>

                                    <p className='text-xl font-semibold mb-4'>Order Summary</p>

                                    <p className='flex justify-between items-center'>

                                        <span>{`Products (${products.length})`}</span>

                                        {allProductHasPrice ?
                                            <span className='flex items-center gap-1'>
                                                <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />
                                                {totalPrice}
                                            </span>
                                            :
                                            <span className='text-muted-foreground'>Quote Required</span>
                                        }

                                    </p>


                                    <p className='flex justify-between items-center my-2'>

                                        <span>{`Services (${services.length})`}</span>


                                        <span className='text-muted-foreground'>Quote Required</span>

                                    </p>


                                    <p className='flex justify-between items-center'>

                                        <span>{`Product Requests (${productRequests.length})`}</span>


                                        <span className='text-muted-foreground'>Quote Required</span>

                                    </p>

                                    <div className='border-t-2 my-2'></div>

                                    <p className='flex justify-between items-center'>

                                        <span>Total</span>

                                        {!allProductHasPrice || services.length > 0 || productRequests.length > 0 ?
                                            <span className='text-muted-foreground'>Quote Required</span>
                                            :
                                            <span className='flex items-center gap-1'>
                                                <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />
                                                {totalPrice}
                                            </span>
                                        }

                                    </p>

                                    {
                                        (!allProductHasPrice || services.length > 0 || productRequests.length) > 0 && <div className="mt-6 p-3 border rounded-md bg-yellow-50 text-yellow-800 text-sm">
                                            Some items require pricing approval
                                        </div>
                                    }

                                    <Button
                                        className='w-full mt-5'
                                        type='submit'
                                        form='order-address'
                                        disabled={isPending}

                                    >
                                        {isPending ? "Confirming..." : "Confirm Order"}
                                    </Button>


                                    <div className="mt-6 p-3 border rounded-md text-muted-foreground text-sm">
                                        Waiting for price quote.
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
            }
        </div>

    );
}

// TODO: update price and status