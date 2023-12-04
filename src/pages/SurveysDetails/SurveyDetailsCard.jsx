import { useRef, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { MdOutlineFlag } from "react-icons/md";
import { useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUserCircle } from 'react-icons/fa';


const SurveyDetailsCard = ({ item, refetch }) => {
    const { _id, voteYes, voteNo, comments, likes, dislikes } = item;
    const [selectedOption, setSelectedOption] = useState('');
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [visible, setVisibleBtn] = useState(false);
    const [comment, setComment] = useState('');
    const { user } = useAuth();
    const numVotedYes = parseInt(voteYes);
    const numVotedNo = parseInt(voteNo);
    const numLikes = parseInt(likes);
    const numDislike = parseInt(dislikes);
    const axiosSecure = useAxiosSecure();
    const commentRef = useRef();


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
            axiosSecure.patch(`/surveys/${_id}`, {
                voteYes: numVotedYes + 1,
                voterEmail: user.email,
                voterName: user?.displayName,
                voted: "Yes",
                date: new Date()
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        setHasVoted(true);
                        localStorage.setItem(`voted_${_id}${user?.email}`, 'true');
                        Swal.fire({
                            icon: "success",
                            text: "voted successfully"
                        })
                        refetch()
                    }
                })
        } else {
            axiosSecure.patch(`/surveys/${_id}`, {
                voteNo: numVotedNo + 1,
                voterEmail: user.email,
                voterName: user?.displayName,
                voted: "No",
                date: new Date()
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        setHasVoted(true);
                        localStorage.setItem(`voted_${_id}${user?.email}`, 'true');
                        Swal.fire({
                            icon: "success",
                            text: "voted successfully"
                        })
                        refetch()
                    }
                })
        }
    };
    const handleLiked = () => {
        if (hasLiked) {
            return
        }
        axiosSecure.patch(`/surveys/${_id}`, { likes: numLikes + 1 })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    localStorage.setItem(`liked_${_id}${user?.email}`, 'true');
                    setHasLiked(true);
                    if (hasDisliked) {
                        localStorage.removeItem(`Disliked_${_id}${user?.email}`);
                        setHasDisliked(false)
                        refetch()
                    }
                }
            })
    }

    const handleDisliked = () => {
        axiosSecure.patch(`/surveys/${_id}`, { dislikes: numDislike + 1 })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    localStorage.setItem(`Disliked_${_id}${user?.email}`, 'true');
                    setHasDisliked(true);
                    if (hasLiked && numLikes > 0) {
                        axiosSecure.patch(`/surveys/${_id}`, { likes: numLikes - 1 })
                        localStorage.removeItem(`liked_${_id}${user?.email}`);
                        setHasLiked(false);
                        refetch();
                    }
                }
            })
    }

    const handleComment = () => {
        axiosSecure.patch(`/surveys/${_id}`, { commentText: comment, userId: user?.email })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    setComment('')
                    setVisibleBtn(false)
                    refetch();
                }
            })
    }

    const handleCancel = () => {
        setVisibleBtn(false)
        setComment('');
    }
    const reportSurvey = (reason) => {
        axiosSecure.patch(`/surveys/${_id}`, { reason, reportedBy: user?.email })
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        text: "reported successfully"
                    })
                }
            })
    }


    const totalVotes = numVotedYes + numVotedNo;
    const YesPercentage = totalVotes > 0 ? (numVotedYes / totalVotes) * 100 : 0;
    const NoPercentage = totalVotes > 0 ? (numVotedNo / totalVotes) * 100 : 0;

    return (
        <div className='rounded-lg lg:mx-60  bg-slate-300 '>
            <span className='flex justify-end'><button onClick={() => reportSurvey('Inappropriate Content')} className='btn btn-sm mr-3 mt-4'><MdOutlineFlag />Report</button></span>
            <div className="flex justify-center items-center flex-col ">

                <form onSubmit={handleSubmit} className="p-6 w-96 space-y-4">
                    <fieldset>
                        <div>
                            <legend className="text-xl text-white font-semibold mb-4">What is your favorite color?</legend>
                        </div>
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
                    <input type="submit" disabled={selectedOption === ''} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500" value="Vote" />
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
                    <div className='flex justify-between'>
                        <div>
                            <button onClick={() => document.getElementById(`my_modal_${_id}`).showModal()} className='btn btn-sm mb-5'>comments ({comments ? comments?.length : 0})</button>
                            <dialog id={`my_modal_${_id}`} className="modal">
                                <div className="modal-box">
                                    {
                                        comments?.map((comment, idx) => (
                                            <div className='pb-3' key={idx}>
                                                <span className='flex items-center gap-2 font-medium'><FaUserCircle />{comment?.userId}</span>
                                                <p className='pl-5'>{comment?.text}</p>
                                            </div>
                                        ))}
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                        {visible && <div className='flex gap-2 justify-end pb-5'><button className='btn btn-sm' onClick={handleCancel}>Cancel</button> <button disabled={comment === ''} onClick={handleComment} className='btn btn-sm'>Comment</button></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyDetailsCard;
