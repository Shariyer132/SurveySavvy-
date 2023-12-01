import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: [user?.email, 'isProUser'],
        enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking user is pro-user', user);
            const res = await axiosSecure.get(`/users/role/${user.email}`)
            console.log(res.data);
            return res.data;
        }
    })
    return [isProUser, isProUserLoading]
};

export default useProUser;