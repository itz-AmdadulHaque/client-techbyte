// app/gallery/image-gallery.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ImageGallery({
    images,
}: {
    images: { image: string }[];
}) {
    const [api, setApi] = useState<CarouselApi>();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCurrentIndex(api.selectedScrollSnap());
        api.on("select", () => setCurrentIndex(api.selectedScrollSnap()));
    }, [api]);



    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Main carousel */}
            <Carousel setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                    {images.map((img, idx) => (
                        <CarouselItem key={idx}>
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${img.image}`}
                                    alt={`Image ${idx + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto">
                {images.map((img, idx) => {
                    const actualIndex = images.indexOf(img);
                    return (
                        <div
                            key={idx}
                            className="relative w-24 h-16 flex-shrink-0 cursor-pointer hover:opacity-80"
                            onClick={() => api?.scrollTo(actualIndex)}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${img.image}`}
                                alt={`Preview ${idx + 1}`}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
