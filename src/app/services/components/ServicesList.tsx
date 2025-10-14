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
import ServiceCard from "@/components/custom/ServiceCard/ServiceCard";

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




    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Filters */}
            <ServicesFilterForm categories={categories} />

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service: ServiceType) => (
                    <ServiceCard service={service} key={service.id} />
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
