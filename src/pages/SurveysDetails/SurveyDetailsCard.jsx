import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const SurveyDetailsCard = ({ item, refetch }) => {
    const { _id, voteYes, voteNo, likes , dislikes} = item;
    const [selectedOption, setSelectedOption] = useState('');
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const numVotedYes = parseInt(voteYes);
    const numVotedNo = parseInt(voteNo);
    const axiosPublic = useAxiosPublic();


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption === "Yes") {
            console.log(numVotedYes + 1);
            axiosPublic.patch(`/surveys/${_id}`, { voteYes: numVotedYes + 1 })
                .then(res => {
                    console.log(res.data);
                    refetch()
                })
        } else {
            axiosPublic.patch(`/surveys/${_id}`, { voteNo: numVotedNo + 1 })
                .then(res => {
                    console.log(res.data);
                    refetch()
                })
        }
    };


    const totalVotes = numVotedYes + numVotedNo;
    const option1Percentage = totalVotes > 0 ? (numVotedYes / totalVotes) * 100 : 0;
    const option2Percentage = totalVotes > 0 ? (numVotedNo / totalVotes) * 100 : 0;

    return (
        <div className="flex justify-center items-center min-w-max rounded-lg mx-7 bg-slate-300">
            <form onSubmit={handleSubmit} className="p-6 w-full space-y-4">
                <fieldset>
                    <legend className="text-xl text-white font-semibold mb-4">What is your favorite color?</legend>
                    <div className="flex items-center mb-4">
                        <input
                            id="option1"
                            type="radio"
                            name="poll"
                            value="Yes"
                            checked={selectedOption === 'Yes'}
                            onChange={handleOptionChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300"
                        />
                        <div className="w-1/2 h-8 relative rounded-lg ml-2 dark:bg-gray-700">
                            <div className="bg-gray-600 h-8 text-white pl-3 pt-1 rounded-lg" style={{ width: `${option1Percentage}%` }}>Yes</div>
                            <span className="text-white absolute right-2 top-1">{option1Percentage.toFixed(0)}%</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="option2"
                            type="radio"
                            name="poll"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300"
                        />
                        <div className="w-1/2 h-8 relative rounded-lg ml-2 dark:bg-gray-700">
                            <div className="bg-gray-600 h-8 text-white pl-3 pt-1 rounded-lg" style={{ width: `${option2Percentage}%` }}>No</div>
                            <span className="text-white absolute right-2 top-1">{option2Percentage.toFixed(0)}%</span>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500">
                    Vote
                </button>
                <div className='flex gap-4'>
                    <div className='flex items-center'>
                       {hasLiked ? <AiFillLike/>: <AiOutlineLike />}
                        <span>{likes}</span>
                    </div>
                    <div className='flex items-center'>
                        {hasDisliked ? <AiFillDislike/> : <AiOutlineDislike />}
                        <span>{dislikes}</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SurveyDetailsCard;
