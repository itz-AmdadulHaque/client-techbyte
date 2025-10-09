"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { BannerType } from "@/Types/Types";

export default function PromoCarousel({ banners }: { banners: BannerType[] }) {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true, align: "start" }}
            className="w-full max-w-7xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="-ml-4">
                {banners.map((banner) => (
                    <CarouselItem
                        key={banner.id}
                        className="pl-4 basis-full"
                    >
                        <div className="relative aspect-[20/5] overflow-hidden rounded-lg shadow">
                            <Image src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${banner.image}`} alt={banner.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/10 flex items-end p-4 text-white">
                                <h3 className="text-xl font-semibold">{banner.title}</h3>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 z-20" />
            <CarouselNext className="absolute right-2 top-1/2 z-20" />
        </Carousel>
    );
}
