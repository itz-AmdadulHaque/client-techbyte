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
import Link from "next/link";

export default function PromoCarousel({ banners }: { banners: BannerType[] }) {
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
       <div className="relative w-full max-w-8xl mx-auto mt-4 p-4">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background via-background/70 to-transparent z-10" />

      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
          align: "center",
          skipSnaps: false,
          duration: 30,
          dragFree: false,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent className="-ml-8 gap-8">
          {banners.map((banner) => {
            const BannerContent = (
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg group transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${banner.image}`}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
                
              </div>
            );

            return (
              <CarouselItem
                key={banner.id}
                className="
                  pl-8
                  basis-[100%]
                  sm:basis-[90%]
                  md:basis-[80%]
                  lg:basis-[70%]
                  xl:basis-[65%]
                "
              >
                {banner.link ? (
                  <Link href={banner.link}>
                    {BannerContent}
                  </Link>
                ) : (
                  BannerContent
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-3 top-1/2 z-20 -translate-y-1/2" />
        <CarouselNext className="absolute -right-3 top-1/2 z-20 -translate-y-1/2" />
      </Carousel>
    </div>

    );
}
