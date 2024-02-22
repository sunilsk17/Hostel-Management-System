import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user-token');
        navigate('/');
    }

    return (
        <nav className="bg-cyan-800 py-3 min-w-full">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold tracking-widest">CEG Hostels</h1>
                <ul className="flex space-x-4">
                    <li>
                        <button className='text-black bg-gray-200 flex rounded-full font-sans font-semibold flex-row items-center  justify-between p-2 cursor-pointer hover:bg-gray-300 shadow' onClick={logout}>
                            <div className='mr-2'><BiLogOut /></div>
                            <div>Logout</div>
                        </button>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Navbar
