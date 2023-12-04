import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = (role) => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure();

    const {data: hasRole, isLoading:isRoleLoading} = useQuery({
        queryKey: [user?.email, role],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`)
            return res.data.role === role;
        }
    })
    return [hasRole, isRoleLoading]
};

export default useUserRole;