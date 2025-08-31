// lib/api.ts
export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
        cache: "no-store", // SSR fresh data
    });
    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json()

    return data.data;
}

export async function getConsultants(params: {
    name?: string;
    page?: number;
    limit?: number;
    isActive?: string;
    category?: string;
}) {
    const query = new URLSearchParams();
    if (params.name) query.set("search", params.name);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.isActive) query.set("isActive", params.isActive);
    if (params.category) query.set("category", params.category);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/consultants?${query.toString()}`,
        { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch consultants");

    const data = await res.json()

    return data.data;
}
