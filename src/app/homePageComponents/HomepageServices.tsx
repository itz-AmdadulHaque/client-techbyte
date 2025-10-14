"use client";
import SectionTitle from '@/components/custom/SectionTitle/SectionTitle';
import ServiceCard from '@/components/custom/ServiceCard/ServiceCard';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ServiceType } from '@/Types/Types'
import Autoplay from 'embla-carousel-autoplay';
import  { useRef } from 'react'

const HomepageServices = ({ services, title }: { services: ServiceType[], title: string }) => {

    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    return (
        <div className='mt-16 mb-8 pb-10'>

            <SectionTitle title={title} />

            <Carousel plugins={[plugin.current]}>
                <CarouselContent>
                    {services.map((service) => <CarouselItem key={service.id} className="md:basis-2/3 lg:basis-1/3"><ServiceCard service={service} /></CarouselItem>)}
                </CarouselContent>
            </Carousel>

            {/* <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {services.map((service) => <ServiceCard key={service.id} service={service} />)}
            </div> */}


        </div>
    )
}

export default HomepageServices