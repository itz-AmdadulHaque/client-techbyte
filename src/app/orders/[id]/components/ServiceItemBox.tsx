"use client";

import ItemCounter from '@/components/custom/ItemCounter/ItemCounter';
import { Badge } from '@/components/ui/badge';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { dateFormatter } from '@/lib/dateFormatter';
import { queryClient } from '@/Provider/ReactQueryClientProvider';
import { ProductCartItemType, ServiceItemType } from '@/Types/ComponentTypes'
import { useMutation } from '@tanstack/react-query';
import { Pencil, Trash, Trash2, X } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner';

const ServiceItemBox = ({ service, date }: { service: ServiceItemType, date: string }) => {


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

                <p className='text-sm text-muted-foreground my-2'>
                    {service.description}
                </p>

                <div className='space-x-3'>
                    {service.service.price
                        ?
                        <p className="text-md mt-4 flex items-center gap-1">

                            <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                            <span>{service.service.price}</span>
                        </p>
                        :
                        <Badge variant="secondary">Quote Required</Badge>
                    }

                    <Badge variant="outline">Requested: {dateFormatter(date)}</Badge>
                </div>


            </div>


        </div>
    )
}

export default ServiceItemBox