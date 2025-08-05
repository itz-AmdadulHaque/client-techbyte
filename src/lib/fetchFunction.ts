export const fetchData = async (url: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`)
    const data = await res.json();

    return data;
}