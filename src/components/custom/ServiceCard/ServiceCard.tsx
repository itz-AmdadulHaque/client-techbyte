import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ServiceType } from '@/Types/Types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCart from '../AddToCart/AddToCart'

const ServiceCard = ({ service }: { service: ServiceType }) => {

    function truncateHtml(html: string, length: number) {
        // Strip tags for counting
        const text = html.replace(/<[^>]+>/g, "");
        return text.length > length ? text.slice(0, length) + "..." : text;
    }
    return (
        <Card key={service.id} className="shadow-md rounded-2xl overflow-hidden">
            <CardHeader className="flex items-center gap-4 mb-4">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service.thumbnail}`}
                    alt={service.title}
                    width={80}
                    height={80}
                    className="w-28 h-28 rounded-sm object-cover"
                />
                <div>
                    <h3 className="font-semibold text-xl">{service.title}</h3>

                    <p
                        className="text-sm mb-3 mt-6"
                        dangerouslySetInnerHTML={{
                            __html: truncateHtml(service.description, 100),
                        }}
                    />
                </div>
            </CardHeader>
            <CardContent>


                <div className="flex justify-between">
                    <Button asChild  variant="success">
                        <Link href={`/services/${service.slug}`}>Show Details</Link>
                    </Button>

                    <AddToCart id={service.id} slug={service.slug} type="service" variant="outline" count={1} />
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceCard