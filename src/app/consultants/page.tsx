// app/consultants/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { ConsultantList } from "./components/ConsultantsList";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay/LoadingOverlay";

export const metadata: Metadata = {
  title: "Consultants | TechVibe Global",
  description:
    "Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.",
};


export default async function ConsultantsPage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense fallback={<LoadingOverlay visible blur />}>
      <ConsultantList searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
