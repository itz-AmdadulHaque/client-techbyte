// app/consultants/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import { ConsultantList } from "./components/ConsultantsList";

export const metadata: Metadata = {
  title: "Consultants | SafetyPro",
  description:
    "Find expert consultants in fire safety, infrastructure integrity, and IT security.",
};

export default async function ConsultantsPage({
  searchParams,
}: {
  searchParams: {
    name?: string;
    page?: string;
    limit?: string;
    isActive?: string;
    category?: string;
  };
}) {
  return (
    <Suspense fallback={<div>Loading consultants...</div>}>
      <ConsultantList searchParams={searchParams} />
    </Suspense>
  );
}
