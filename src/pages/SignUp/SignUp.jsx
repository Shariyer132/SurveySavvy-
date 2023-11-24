import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";



const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        reset();
                        Swal.fire({
                            title: "Sucess",
                            text: "User is successfully created",
                            icon: "success"
                        });
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error.message);
                    })

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <>
            <Helmet>
                <title>
                    Bistro Boss | Sign Up
                </title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="pt-2 text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} name="photoURL" placeholder="Name" className="input input-bordered" />
                                {errors.photoUrl && <span className="pt-2 text-red-600">PhotoURL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="pt-2 text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/ })} name="password" placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className="pt-2 text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="pt-2 text-red-600">Password must be 6 character</span>}
                                {errors.password?.type === 'maxLength' && <span className="pt-2 text-red-600">Password must less than 20 character</span>}
                                {errors.password?.type === 'pattern' && <span className="pt-2 text-red-600">Password must have one uppercase, one lowercase and one special character</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-center pb-4'><small>Already have an Account? <Link className="text-red-600 font-medium text-base" to="/login">Login</Link></small></p>
                        <div className="flex justify-center">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;