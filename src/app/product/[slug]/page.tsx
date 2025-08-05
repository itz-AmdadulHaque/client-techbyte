import ImageGallery from '@/components/custom/ImageGallery/ImageGallery';
import { fetchData } from '@/lib/fetchFunction'
import { Product } from '@/Types/Types';
import React from 'react'

const ProductDetails = async ({ params }: { params: { slug: string } }) => {

    

    const data = await fetchData(`/products/${params.slug}`)

    const product: Product = data.data;

    console.log("Product Details:", data.data);

    return (
        <div className="container mx-auto p-4">
            
            <ImageGallery images={product.images} />
        </div>
    )
}

export default ProductDetails