import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const CreateSurvey = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const onSubmit = (data) => {
        console.log(data);
        axiosSecure.post('/surveys',{
            title: data.title,
            description: data.description,
            options: ["Yes", "No"],
            likes: 0,
            dislikes: 0,
            voteYes: 0,
            voteNo: 0, 
            category: data.category,
            status: "Pending",
            creatorEmail: user.email
        })
        .then(res => {
            if (res.data.insertedId) {
                reset()
                Swal.fire({
                    title: "Sucess",
                    text: "Survey is successfully created",
                    icon: "success"
                });
            }
        })
    }

    return (
        <div>
            <h2 className='text-4xl font-normal text-center py-8'>Create a Survey</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-5xl mx-auto'>
                <div className='flex flex-col gap-4'>
                    <label className='text-xl font-semibold'>Title:</label>
                    <input
                    {...register("title")}
                        className='w-full input-info input-md rounded-lg'
                        type="text"
                        name="title"
                        required
                    />
                    {errors.title && <span className="pt-2 text-red-600">Title is required</span>}
                </div>
                <div className='flex flex-col gap-4 my-3'>
                    <label className='text-xl font-semibold'>Category:</label>
                    <select
                    {...register("category")}
                        className='w-1/3 input-md rounded-lg input-info'
                        name="category"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Public Policy">Public Policy</option>
                        <option value="Education">Education</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Environment">Environment</option>
                        <option value="Social Issues">Social Issues</option>
                        <option value="Technology and Innovation">Technology and Innovation</option>
                        <option value="Labor and Employment">Labor and Employment</option>
                        <option value="Foreign Affairs">Foreign Affairs</option>

                    </select>
                        {errors.category && <span className="pt-2 text-red-600">Category is required</span>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='text-xl font-semibold'>Description:</label>
                    <textarea
                    {...register("description")}
                        className='input-info rounded-lg'
                        name="description"
                        required
                    />
                    {errors.description && <span className="pt-2 text-red-600">Description is required</span>}
                    {errors.description?.type === 'minLength' && <span className="pt-2 text-red-600">Description must contain atleast 30 character</span>}
                </div>

                <input type="submit" value="Create Survey" className='btn btn-block mt-7 btn-info' />
            </form>
        </div>
    );
};

export default CreateSurvey;
