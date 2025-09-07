
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export const useCartInfo = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    return useQuery({
        queryKey: ["cartInfo", auth?.user?.id], // keep it per-user
        queryFn: async () => {
            const res = await axiosPrivate.get("/cart");
            return res.data.data;
        },
        enabled: !!auth?.user,
    });
};
