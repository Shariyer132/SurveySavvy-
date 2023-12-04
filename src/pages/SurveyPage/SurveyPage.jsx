
import Servey from "../../components/SurveyCart/Servey";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useUserRole from "../../hooks/useUserRole";



const SurveyPage = () => {
    const [filter, setFilter] = useState({ title: '', category: '', mostVoted: false });
    const axiosPublic = useAxiosPublic();
    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axiosPublic.get('/surveys');
            return res.data;
        }
    })
    const [proUser] = useUserRole("pro-user");
    const publishedSurveys = surveys.filter(survey => survey.status === 'Published')

    const filteredSurveys = useMemo(() => {
        let filtered = publishedSurveys;
        if (filter.title) {
            filtered = filtered.filter(survey => survey.title.toLowerCase().includes(filter.title.toLowerCase()));
        }
        if (filter.category) {
            filtered = filtered.filter(survey => survey.category.toLowerCase().includes(filter.category.toLowerCase()));
        }
        if (filter.mostVoted) {
            filtered = filtered.sort((a, b) => b.totalVotes - a.totalVotes);
        }

        return filtered;
    }, [filter, publishedSurveys]);

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };




    if (isLoading) {
        return <h2 className="pt-44 pl-64">loading ..</h2>
    }

    return (
        <div>
            <Helmet>
                <title>Survey Savvy | Surveys</title>
            </Helmet>
            <div className="pt-24 pb-10 flex justify-center items-center gap-7">
                <input
                    type="text"
                    name="title"
                    className="input input-bordered input-info w-full max-w-xs"
                    placeholder="Filter by title..."
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="category"
                    className="input input-bordered input-info w-full max-w-xs"
                    placeholder="Filter by category..."
                    onChange={handleFilterChange}
                />
                <label className="text-xl font-medium">
                    Most Voted
                    <input
                        type="checkbox"
                        name="mostVoted"
                        onChange={() => setFilter({ ...filter, mostVoted: !filter.mostVoted })}
                    />
                </label>
                {
                  proUser ? <></> : <Link to="/dashboard/payment"> <button className="btn btn-info">Become a Pro User</button></Link>
                }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-6 pb-20 mx-auto">
                {
                    filteredSurveys.map((item, idx) => <Servey item={item} key={idx}></Servey>)
                }
            </div>
        </div>
    );
};

export default SurveyPage;