// app/consultants/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { ConsultantList } from "./components/ConsultantsList";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Suspense fallback={<Loader2 className={cn("h-5 w-5 animate-spin text-muted-foreground", "mr-2 h-24 w-24 animate-spin")} />}>
      <ConsultantList searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
