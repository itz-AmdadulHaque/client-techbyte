import AddToCart from '@/components/custom/AddToCart/AddToCart';
import ImageGallery from '@/components/custom/ImageGallery/ImageGallery';
import ItemCounter from '@/components/custom/ItemCounter/ItemCounter';
import { fetchData } from '@/lib/fetchFunction'
import { Product } from '@/Types/Types';
import Image from 'next/image';
import React from 'react'

const ProductDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {



    const data = await fetchData(`/products/${(await params).slug}`)

    const product: Product = data.data;

    console.log("Product Details:", data.data);

    return (
        <div className="container mx-auto mb-16 p-4">

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 p-8">

                <div>
                    <ImageGallery images={product.images} />
                </div>

                <div className='lg:col-span-2 space-y-4 p-4'>

                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.brand.image}`}
                        alt={product.brand.title}
                        width={100}
                        height={100}
                        className='w-16 h-14 object-contain mb-2'
                    />

                    <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                    <h2 className='text-lg mb-3'><span className='text-xl font-semibold'>Model:</span> {product.modelNumber}</h2>


                    {product.stock > 0 ? <p className='text-green-700 font-semibold text-lg'>In Stock</p> : <p className='text-red-700 font-semibold text-lg'>Out Of Stock</p>}

                    <p className="text-2xl font-semibold mt-4 flex items-center gap-1">

                        <Image src="/taka.png" alt="Taka symbol" width={20} height={20} />

                        {product.price?.toFixed(2)}
                    </p>

                    <ItemCounter />

                    <AddToCart id={product.id} type="product" />

                </div>

            </div>


            <div className="p-4 lg:p-8">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="tiptap" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
        </div>
    )
}

export default ProductDetails