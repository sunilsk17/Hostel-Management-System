import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { FaTachometerAlt, FaBed, FaUserCheck, FaFileInvoice, FaMinusCircle } from 'react-icons/fa'

import swal from 'sweetalert';
import Transitions from '../components/Transitions';
const StudentRoom = () => {
    const [isAlloted, setIsAlloted] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEnable, setIsEnabled] = useState(false);
    const [data, setData] = useState({
        hostel: "",
        room: 0
    })
    const [error, setError] = useState('');
    const checkIfEnabled = async () => {
        await fetch("http://localhost:8800/admin/room-enable", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json()
        }).then(data => {
            const message = data.message
            if (message == "enabled") {
                setIsEnabled(true);
            } else {
                setIsEnabled(false);
            }
        })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    useEffect(() => {
        checkIfEnabled();
    }, [])
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (userToken === 'studentstudent') {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
            navigate('/');
        }
    }
    const checkIfAlloted = async () => {
        await fetch("http://localhost:8800/student/room/" + localStorage.getItem("id"), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json()
        }).then(data => {
            const message = data.message
            if (message != "NA") {
                setIsAlloted(true);
                setData({ "hostel": data.hostel, "room": data.room })
            } else {
                setData({ ...data, "hostel": data.hostel })
            }
        })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    useEffect(() => {
        checkIfAlloted();
        checkUserToken();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.hostel === "") {
            swal("Error", "Select Hostel", "error")
            return;
        }
        else if (data.room === "") {
            swal("Error", "Select Room No.", "error");
            return;
        }
        await fetch("http://localhost:8800/student/room/" + localStorage.getItem("id"), {
            method: 'POST',
            body: JSON.stringify({
                hostel: data.hostel,
                room: data.room
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json()
            })
            .then(data => {
                const message = data.message
                if (message === 'SUCCESS') {
                    swal("Room Allocated Successfully", "", "success")
                    setIsAlloted(true);
                } else {
                    swal("Sorry", "Room not available", "warning")
                    return;
                }
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log(data);
    }
    return (
        <Transitions>
            <Navbar />
            <div className='flex'>
                <div>
                    <SideBar user="Student" links={[
                        { label: "Dashboard", path: "/student/" + localStorage.getItem("id"), icon: FaTachometerAlt },
                        { label: "Room Allocation", path: "/student/room/" + localStorage.getItem("id"), icon: FaBed },
                        { label: "View Attendance", path: "/student/attendance/" + localStorage.getItem('id'), icon: FaUserCheck },
                        { label: "View Mess Bill", path: "/student/messbill/" + localStorage.getItem('id'), icon: FaFileInvoice },
                        { label: 'Apply for Mess Reduction', path: '/student/reduction/' + localStorage.getItem('id'), icon: FaMinusCircle }]} /></div>
                    <div>
                        {isAlloted ?
                            <div className="items-center justify-between mb-4 mr-6  bg-gray-100 rounded p-12 shadow-lg mt-20 ml-20">
                                <div className='font-bold text-3xl uppercase'>Your Room Details</div><br></br><br></br>
                                <div className='flex justify-between'><div className='font-semibold text-gray-800 px-6 text-xl'>Hostel:</div><div className='uppercase'> {data.hostel}</div></div><br></br>
                                <div className='flex justify-between'><div className='font-semibold text-gray-800 px-6 text-xl'>Room:</div><div> {data.room}</div></div>
                            </div> : isEnable ?
                                <div className='ml-20'>
                                    <div className="relative flex flex-col mt-20 overflow-hidden">
                                        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                                                Select Hostel and Room
                                            </h2>
                                            <form className='mt-6'>
                                                <div className='mb-2'>
                                                    <label className='block text-sm font-semibold text-gray-800'>Hostel</label>
                                                    <select name="hostel" value={data.hostel} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' required>
                                                        <option value={null} selected>Select Hostel</option>
                                                        <option value={data.hostel}>{data.hostel}</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className='block text-sm font-semibold text-gray-800'>Room No. </label>
                                                    <select name="room" value={data.room} onChange={handleChange} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' required >
                                                        <option value={null} selected>Select Room</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                        <option value='5'>5</option>
                                                    </select>
                                                </div>
                                                {error &&
                                                    <div className='text-red-500 font-serif'>
                                                        {error}
                                                    </div>}
                                                <div className='mt-6'>
                                                    <input type="submit" value="Submit" onClick={handleSubmit} className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'></input>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div> : <div className="items-center justify-between mb-4 mr-6  bg-gray-100 rounded p-12 shadow-lg mt-20 ml-20 text-xl text-center font-gilda font-bold text-yellow-700">The Process is closed as of now.<br></br> Please Contact Administrator for further details.</div>
                        }
                    </div>
                </div>
            </Transitions>
    )
}

export default StudentRoom

