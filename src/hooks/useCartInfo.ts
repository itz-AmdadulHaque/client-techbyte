
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export const useCartInfo = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    return useQuery({
        queryKey: ["cartInfo"], // make it per-user
        queryFn: async () => {
            const res = await axiosPrivate.get("/cart");
            return res.data.data;
        },
        enabled: !!auth?.user,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,   
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};


