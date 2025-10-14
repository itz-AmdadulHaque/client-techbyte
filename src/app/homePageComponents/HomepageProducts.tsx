"use client";
import ProductCard from '@/components/custom/ProductCard/ProductCard';
import SectionTitle from '@/components/custom/SectionTitle/SectionTitle';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Product } from '@/Types/Types'
import Autoplay from 'embla-carousel-autoplay';
import  { useRef } from 'react'

const HomepageProducts = ({ products, title }: { products: Product[], title: string }) => {

    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className='mt-16 mb-8 pb-10'>

            <SectionTitle title={title} />

            <Carousel plugins={[plugin.current]}>
                <CarouselContent>
                    {products.map((product) => <CarouselItem key={product.id} className="basis-3/4 md:basis-1/2 lg:basis-1/4 py-2"><ProductCard product={product} /></CarouselItem>)}
                </CarouselContent>
            </Carousel>

            {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div> */}


        </div>
    )
}

export default HomepageProducts