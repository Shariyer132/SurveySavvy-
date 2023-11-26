
import Servey from "../../components/SurveyCart/Servey";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";



const SurveyPage = () => {
    const [filter, setFilter] = useState({ title: '', category: '', mostVoted: false });
    const { data: surveys = [], isLoading } = useQuery({
        queryKey: ['surveys'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/surveys');
            return res.data;
        }
    })
    console.log(surveys);
    
        const filteredSurveys = useMemo(() => {
            let filtered = surveys;
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
        }, [filter, surveys]);
    
        const handleFilterChange = (e) => {
            setFilter({ ...filter, [e.target.name]: e.target.value });
        };




    if (isLoading) {
        return <h2 className="pt-44 pl-64">loading ..</h2>
    }

    return (
        <div>
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