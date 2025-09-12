"use client";

import { Badge } from '@/components/ui/badge';
import { ProductOrderItemType } from '@/Types/ComponentTypes'
import Image from 'next/image'
import React from 'react'

const ProductItemBox = ({ product }: { product: ProductOrderItemType }) => {



    return (
        <div className='border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center'>
            <Image
                height={70}
                width={70}
                className='w-20 h-20 object-contain'
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.product.images[0].image}`}
                alt={product.product.title}
            />


            <div>
                <h2 className='text-xl font-semibold'>{product.product.title}</h2>

                <p>{product.description}</p>

                <div>
                    <Badge>Qty: {product.quantity}</Badge>
                </div>

                {/* {product.product.price
                    ?
                    <p className="text-md mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                        <span>{product.product.price}</span>
                    </p>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                } */}


            </div>
            <div className="ml-auto">

                {product.product.price
                    ?
                    <div>

                        <p className="text-sm mt-4 flex items-center text-muted-foreground">
                            <span>Unit: </span>

                            <Image src="/taka.png" alt="Taka symbol" width={12} height={12} />

                            <span>{product.product.price}</span>
                        </p>

                        <p className="text-xl font-semibold mt-4 flex items-center">

                            <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

                            <span>{Number(product.product.price) * product.quantity}</span>
                        </p>
                    </div>
                    :
                    <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
                }
            </div>

        </div>
    )
}

export default ProductItemBox