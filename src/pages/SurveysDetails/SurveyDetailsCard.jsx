import { useRef, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useEffect } from 'react';


const SurveyDetailsCard = ({ item, refetch }) => {
    const { _id, voteYes, voteNo, likes, title, dislikes } = item;
    const [selectedOption, setSelectedOption] = useState('');
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [visible, setVisibleBtn] = useState(false)
    const [comment, setComment] = useState('');
    const { user } = useAuth();
    const numVotedYes = parseInt(voteYes);
    const numVotedNo = parseInt(voteNo);
    const numLikes = parseInt(likes)
    const numDislike = parseInt(dislikes)
    const axiosPublic = useAxiosPublic();
    const commentRef = useRef()


    useEffect(() => {
        const surveyVoteStatus = localStorage.getItem(`voted_${_id}${user?.email}`);
        const surveyLikedStatus = localStorage.getItem(`liked_${_id}${user?.email}`);
        const surveyDislikedStatus = localStorage.getItem(`Disliked_${_id}${user?.email}`);
        if (surveyVoteStatus) {
            setHasVoted(true)
        }
        if (surveyLikedStatus) {
            setHasLiked(true)
        }
        if (surveyDislikedStatus) {
            setHasDisliked(true)
        }
    }, [_id, user?.email]);


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (hasVoted) {
            return (
                Swal.fire({
                    icon: "error",
                    text: 'you have already voted'
                })
            )
        }
        if (selectedOption === "Yes") {
            console.log(numVotedYes + 1);
            axiosPublic.patch(`/surveys/${_id}`, { voteYes: numVotedYes + 1 })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        setHasVoted(true);
                        localStorage.setItem(`voted_${_id}${user?.email}`, 'true');
                        axiosPublic.post('/votedUser', {
                            email: user.email,
                            name: user?.displayName,
                            voted: "Yes",
                            survey: title,
                            votedYes: voteYes,
                            votedNo: voteNo
                        })
                            .then(res => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        text: "voted successfully"
                                    })
                                }
                            })
                    }
                    refetch()
                })
        } else {
            axiosPublic.patch(`/surveys/${_id}`, { voteNo: numVotedNo + 1 })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        setHasVoted(true);
                        localStorage.setItem(`voted_${_id}${user?.email}`, 'true');
                        axiosPublic.post('/votedUser', {
                            email: user.email,
                            name: user?.displayName,
                            voted: "No",
                            survey: title,
                            votedYes: voteYes,
                            votedNo: voteNo
                        })
                            .then(res => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        text: "voted successfully"
                                    })
                                }
                            })
                    }
                    refetch()

                })
        }
    };
    const handleLiked = () => {
        if (hasLiked) {
            return
        }
        axiosPublic.patch(`/surveys/${_id}`, { likes: numLikes + 1 })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    localStorage.setItem(`liked_${_id}${user?.email}`, 'true');
                    setHasLiked(true);
                    if (hasDisliked) {
                        localStorage.removeItem(`Disliked_${_id}${user?.email}`);
                        setHasDisliked(false)
                    }
                }
                refetch()
            })
    }

    const handleDisliked = () => {
        axiosPublic.patch(`/surveys/${_id}`, { dislikes: numDislike + 1 })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    localStorage.setItem(`Disliked_${_id}${user?.email}`, 'true');
                    setHasDisliked(true);
                    if (hasLiked && numLikes > 0) {
                        axiosPublic.patch(`/surveys/${_id}`, { likes: numLikes - 1 })
                        localStorage.removeItem(`liked_${_id}${user?.email}`);
                        setHasLiked(false);
                    }
                }
                refetch();
            })
    }

    const handleComment = () => {
        // const comment = commentRef.current.value;
        console.log(comment);
        axiosPublic.patch(`/surveys/${_id}`,  { commentText: comment, userId: user?.email })
        .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                setComment('')
                setVisibleBtn(false)
            }})

    }

    const handleCancel = () => {
        setVisibleBtn(false)
        setComment('');
    }


    const totalVotes = numVotedYes + numVotedNo;
    const YesPercentage = totalVotes > 0 ? (numVotedYes / totalVotes) * 100 : 0;
    const NoPercentage = totalVotes > 0 ? (numVotedNo / totalVotes) * 100 : 0;

    return (
        <div className="flex justify-center items-center flex-col rounded-lg lg:mx-60  bg-slate-300">
            <form onSubmit={handleSubmit} className="p-6 w-96 space-y-4">
                <fieldset>
                    <legend className="text-xl text-white font-semibold mb-4">What is your favorite color?</legend>
                    <div className="flex items-center mb-4">
                        <input
                            id="Yes"
                            type="radio"
                            name="poll"
                            value="Yes"
                            checked={selectedOption === 'Yes'}
                            onChange={handleOptionChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300"
                        />
                        {
                            hasVoted ? <><div className="w-full h-8 relative rounded-lg ml-2 dark:bg-gray-700">
                                <div className="bg-gray-600 h-8 text-white pl-3 pt-1 rounded-lg" style={{ width: `${YesPercentage}%` }}>Yes</div>
                                <span className="text-white absolute right-2 top-1">{YesPercentage.toFixed(0)}%</span>
                            </div></> : <><div className="bg-gray-600 w-full ml-2 h-8 text-white pl-3 pt-1 rounded-lg">Yes</div></>
                        }

                    </div>
                    <div className="flex items-center">
                        <input
                            id="No"
                            type="radio"
                            name="poll"
                            value="No"
                            checked={selectedOption === 'No'}
                            onChange={handleOptionChange}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300"
                        />
                        {
                            hasVoted ? <> <div className=" w-full h-8 relative rounded-lg ml-2 dark:bg-gray-700">
                                <div className="bg-gray-600 h-8 text-white pl-3 pt-1 rounded-lg" style={{ width: `${NoPercentage}%` }}>No</div>
                                <span className="text-white absolute right-2 top-1">{NoPercentage.toFixed(0)}%</span>
                            </div></> : <>
                                <div className="bg-gray-600 w-full ml-2 h-8 text-white pl-3 pt-1 rounded-lg">No</div>
                            </>
                        }
                    </div>
                </fieldset>
                <button type="submit" disabled={selectedOption === ''} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500">
                    Vote
                </button>
                <div className='flex gap-4'>
                    <div onClick={handleLiked} className='flex items-center'>
                        {hasLiked ? <AiFillLike /> : <AiOutlineLike />}
                        <span>{likes}</span>
                    </div>
                    <div onClick={handleDisliked} className='flex items-center'>
                        {hasDisliked ? <AiFillDislike /> : <AiOutlineDislike />}
                    </div>
                </div>
            </form>
            <div className='flex flex-col'>
                <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" ref={commentRef} onFocus={() => setVisibleBtn(true)} className=' py-2 bg-slate-300 my-3 outline-none px-24 border-0 border-b-2 mt-4' name="comment" placeholder='add a comment' id="comment" />
                <div>  {visible && <div className='flex gap-2 justify-end pb-5'><button className='btn btn-sm' onClick={handleCancel}>Cancel</button> <button disabled={comment === ''} onClick={handleComment} className='btn btn-sm'>Comment</button></div>}</div>
            </div>
        </div>
    );
};

export default SurveyDetailsCard;
