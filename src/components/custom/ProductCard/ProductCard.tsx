import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddToCart from "@/components/custom/AddToCart/AddToCart"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from '@/Types/Types'

const ProductCard = ({product}: {product: Product}) => {
    return (
        <Card key={product.id} className="h-full m-2">
            <CardContent className="h-full flex flex-col">
                <Link
                    href={`/product/${product.id}`}
                    className="flex flex-col flex-grow justify-between text-center"
                >
                    <div>
                        <Image
                            src={
                                product.images[0]
                                    ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.images[0].image}`
                                    : "/altImage.jpg"
                            }
                            alt={product.title}
                            width={400}
                            height={160}
                            className="w-full h-72 md:h-64 rounded-md object-contain mb-3"
                        />

                        <h2 className="mt-2 font-semibold my-4">{product.title}</h2>

                        <div className="text-muted-foreground flex items-center justify-center gap-2">
                            <Image src="/taka.png" alt="Taka symbol" width={20} height={20} />
                            <p className="text-md font-bold">{product.price}</p>
                        </div>
                    </div>
                </Link>

                <div className="flex justify-between items-center mt-4">
                    <Link href={`/product/${product.id}`}>
                        <Button >VIEW</Button>
                    </Link>
                    <AddToCart variant="outline" id={product.id} />
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard