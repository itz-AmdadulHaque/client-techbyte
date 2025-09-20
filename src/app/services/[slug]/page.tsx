import AddToCart from '@/components/custom/AddToCart/AddToCart';
import ImageGallery from '@/components/custom/ImageGallery/ImageGallery';
import ItemCounter from '@/components/custom/ItemCounter/ItemCounter';
import { fetchData } from '@/lib/fetchFunction';
import { ServiceType } from '@/Types/Types';
import Image from 'next/image';
import React from 'react'

const ServiceDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const data = await fetchData(`/services/${(await params).slug}`)

    const service: ServiceType = data.data;

    console.log("Product Details:", data.data);
    return (
        <div className="container mx-auto mb-16 p-4">

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 p-8">

                <div>
                    <ImageGallery images={service.images} />
                </div>

                <div className='lg:col-span-2 space-y-4 p-4'>

                    <h1 className="text-3xl font-bold ">{service.title}</h1>

                    <h2 className='mt-3 mb-5'>Category: <span className='font-semibold'>{service.category.title}</span></h2>


                    <AddToCart id={service.id} type="service" count={1} />

                </div>

            </div>


            <div className="p-4 lg:p-8">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="tiptap" dangerouslySetInnerHTML={{ __html: service.description }} />
            </div>
        </div>
    )
}

export default ServiceDetails