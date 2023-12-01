import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useVotedUser = () => {

    const { refetch, data: votedUser = [] } = useQuery({
        queryKey: ['votedUser'],
        queryFn: async () => {
            const res = await axios.get('/votedUser')
            console.log(res.data);
            return res.data
        }
    })
    return [votedUser, refetch];
};

export default useVotedUser;