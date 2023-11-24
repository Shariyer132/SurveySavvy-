import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(result => console.log(result.user))
            .catch(error => console.log(error.message))
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink>contact us</NavLink></li>
        <li><NavLink>dashboard</NavLink></li>
        <li><NavLink to="/menu">our menu</NavLink></li>
        <li><NavLink to="/order/salads">Order now</NavLink></li>
        <li>
            <Link to="/dashboard/cart">
                <button className='btn btn-sm'>
                    <FaShoppingCart />
                    <div className="badge badge-secondary">+0</div>
                </button>
            </Link>
        </li>
        {
            user ? <>
                <button onClick={handleLogOut} className='btn'>log out</button>
            </> : <>
                <li><NavLink to="/login">Login</NavLink></li>
            </>
        }
    </>
    return (
        <>
            <div className="navbar fixed z-10 opacity-70 text-white max-w-screen-xl bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">SurveySavvy</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Navbar;