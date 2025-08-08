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
        <div className="w-full mx-auto">

            {(!images || images.length === 0) && <p className="text-xl h-96 p-10 border text-gray-600 font-semibold">No images available</p>}
            {/* Main carousel */}
            <Carousel setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                    {images.map((img, idx) => (
                        <CarouselItem key={idx}>
                            <div className="relative aspect-square w-full border">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${img.image}`}
                                    alt={`Image ${idx + 1}`}
                                    fill
                                    className="object-contain rounded-lg"
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
                            className={`relative w-16 h-16 flex-shrink-0 cursor-pointer hover:opacity-80 ${currentIndex === actualIndex ? 'border-2 border-blue-800' : ''}`}
                            onClick={() => api?.scrollTo(actualIndex)}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${img.image}`}
                                alt={`Preview ${idx + 1}`}
                                fill
                                className="object-contain rounded-md"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
