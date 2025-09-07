// app/consultants/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { ServiceList } from "./components/ServicesList";

export const metadata: Metadata = {
  title: "Consultants | TechVibe Global",
  description:
    "Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.",
};

export default async function ConsultantsPage({
  searchParams,
}: {
  searchParams: {
    name?: string;
    page?: string;
    limit?: string;
    category?: string;
  };
}) {
  return (
    <Suspense fallback={<div>Loading consultants...</div>}>
      <ServiceList searchParams={searchParams} />
    </Suspense>
  );
}
