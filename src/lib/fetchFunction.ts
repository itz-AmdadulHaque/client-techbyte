export const fetchData = async (url: string, revalidate = 60) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
        next: { revalidate: revalidate }
    })
    const data = await res.json();

    return data;
}