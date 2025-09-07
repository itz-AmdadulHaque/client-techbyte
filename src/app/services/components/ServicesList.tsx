// app/services/service-list.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCategories, getServices } from "./apiCalls";
import { ServiceType } from "@/Types/Types";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ServicesFilterForm from "./ServicesFilter";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import AddToCart from "@/components/custom/AddToCart/AddToCart";

export async function ServiceList({
    searchParams,
}: {
    searchParams: {
        name?: string;
        page?: string;
        limit?: string;
        category?: string;
    };
}) {
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 9;

    const data = await getServices({
        name: searchParams.name,
        page,
        limit,
        category: searchParams.category,
    });

    const services = data.services || []

    const categories = await getCategories();

    function truncateHtml(html: string, length: number) {
        // Strip tags for counting
        const text = html.replace(/<[^>]+>/g, "");
        return text.length > length ? text.slice(0, length) + "..." : text;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Filters */}
            <ServicesFilterForm categories={categories} />

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service: ServiceType) => (
                    <Card key={service.id} className="shadow-md rounded-2xl overflow-hidden">
                        <CardHeader className="flex items-center gap-4 mb-4">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service.images[0].image}`}
                                alt={service.title}
                                width={80}
                                height={80}
                                className="w-28 h-28 rounded-sm object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">{service.title}</h3>

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
                                <Button asChild variant="default">
                                    <Link href={`/services/${service.id}`}>Show Details</Link>
                                </Button>

                                <AddToCart id={service.id} type="service" variant="outline" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <CustomPagination
                currentPage={data.currentPage}
                totalPages={data.totalPages || 1}
            />
        </div>
    );
}
