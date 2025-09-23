import { Suspense } from "react";
import { Metadata } from "next";
import { ServiceList } from "./components/ServicesList";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay/LoadingOverlay";

export const metadata: Metadata = {
  title: "Services | TechVibe Global",
  description:
    "Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.",
};

export default async function ServicePage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
}) {

  const resolvedSearchParams = await searchParams;
  return (
    <Suspense fallback={<LoadingOverlay visible blur />}>
      <ServiceList searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
