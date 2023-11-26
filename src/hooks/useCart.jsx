import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";


const useCart = () => {
    const {user} = useAuth();

    const { refetch, data: cart=[]} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () =>{
        const res = await axios.get('/surveys')
        console.log(res.data);
        return res.data
        }
    })
    return [cart, refetch];
};

export default useCart;