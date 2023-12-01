import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
    const navigate = useNavigate();
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = () =>{
        googleSignIn()
        .then(result=>{
           console.log(result.user);
            axiosPublic.post('/users', {
                email: result.user?.email,
                name: result.user?.displayName,
                photoURL: result.user.PhotoURL,
                role: 'user'
            })
            .then(res=>{
                console.log(res.data);
                navigate('/')
            })
        })
    }



    return (
        <div className='pb-7'>
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;