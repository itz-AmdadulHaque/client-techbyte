"use client";
import ProductCard from '@/components/custom/ProductCard/ProductCard';
import SectionTitle from '@/components/custom/SectionTitle/SectionTitle';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Product } from '@/Types/Types'
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const HomepageProducts = ({ products, title }: { products: Product[], title: string }) => {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className='mt-16 mb-8 pb-10'>
            <SectionTitle title={title} />

            {/* Carousel for small screens */}
            <div className="block lg:hidden">
                <Carousel plugins={[plugin.current]}>
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="basis-3/4 sm:basis-1/2 py-2">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            {/* Grid for large screens */}
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default HomepageProducts;
