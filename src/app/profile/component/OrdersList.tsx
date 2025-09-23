import CustomPagination from '@/components/custom/Pagination/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { dateFormatter } from '@/lib/dateFormatter';
import { OrderType } from '@/Types/Types';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

const OrdersList = ({
    searchParams,
}: {
    searchParams: {
        search?: string | null
        page?: string | null
        limit?: string | null
        status?: string | null
    }
}) => {

    const axiosPrivate = useAxiosPrivate();


    const getOrders = async () => {
        const res = await axiosPrivate.get("/orders/");

        return res.data.data;
    }

    const { data: orders, refetch: handleGetOrders, isPending } = useQuery({
        queryKey: ['get-orders'],
        queryFn: getOrders,

    });

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-500/15 text-yellow-600 border-yellow-500/20",
        IN_PROGRESS: "bg-blue-500/15 text-blue-600 border-blue-500/20",
        PARTIALLY_DONE: "bg-purple-500/15 text-purple-600 border-purple-500/20",
        COMPLETED: "bg-green-500/15 text-green-600 border-green-500/20",
        CANCELLED: "bg-gray-500/15 text-gray-600 border-gray-500/20",
        REJECTED: "bg-red-500/15 text-red-600 border-red-500/20",
    }
    return (
        <div>

            {
                orders?.orders?.length < 1 ? <div>
                    <p>No order yet</p>
                    <Link href="/" >
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
                    :
                    <div>
                        {orders?.orders?.map((order: OrderType) => <Link key={order.id} href={`/orders/${order.id}`}>
                            <div
                                className='text-sm border my-4 p-6 bg-muted rounded-md'
                            >

                                <div className='flex flex-wrap justify-between pb-3 border-b-2 mb-3 '>
                                    <Badge className={statusColors[order.status]}>{order.status}</Badge>

                                    <span className='font-semibold'>ID: {order.id}</span>
                                </div>


                                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <div className="text-sm font-semibold text-gray-700 mb-2">Order Summary</div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">

                                        <div className="bg-white p-3 rounded-md border border-gray-200">
                                            <div className="text-gray-500 text-xs uppercase tracking-wide">Products</div>
                                            <div className="mt-1 text-lg font-bold text-gray-900">
                                                {order._count.productItems}
                                            </div>
                                        </div>

                                        <div className="bg-white p-3 rounded-md border border-gray-200">
                                            <div className="text-gray-500 text-xs uppercase tracking-wide">Services</div>
                                            <div className="mt-1 text-lg font-bold text-gray-900">
                                                {order._count.serviceItems}
                                            </div>
                                        </div>

                                        <div className="bg-white p-3 rounded-md border border-gray-200">
                                            <div className="text-gray-500 text-xs uppercase tracking-wide">Product Requests</div>
                                            <div className="mt-1 text-lg font-bold text-gray-900">
                                                {order._count.productRequests}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className='flex gap-2 mt-5'>
                                    <p className='font-semibold'>Order Date:</p>
                                    <p className='font-bold'>{dateFormatter(order.createdAt)}</p>
                                </div>
                            </div>
                        </Link>)}

                        <CustomPagination
                            currentPage={orders?.currentPage}
                            totalPages={orders?.totalPages || 1}
                        />
                    </div>
            }
        </div>
    )
}

export default OrdersList