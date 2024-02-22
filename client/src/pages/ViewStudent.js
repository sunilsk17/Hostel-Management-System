import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import swal from 'sweetalert'
import DataTable from '../components/DataTable';
import {FaTachometerAlt,FaSignInAlt,FaUser,FaCheckSquare,FaCalculator,FaExclamation} from 'react-icons/fa'
import Transitions from '../components/Transitions'

const ViewStudent = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (userToken === 'wardenwarden') {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
            navigate('/');
        }
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn])
    const headers = [
        {
            label: 'Name',
            value: (data) => data.name
        },
        {
            label: 'E-mail',
            value: (data) => data.email
        },
        {
            label: 'Mobile',
            value: (data) => data.mobile
        },
        {
            label: "Hostel",
            value: (data) => data.hostel
        },
        {
            label: 'Room No',
            value: (data) => data.room
        },
        {
            label: "Degree",
            value: (data) => data.deg
        },
        {
            label: "Emergency Contact",
            value: (data) => data.fathermobile
        },
        {
            label:"BlackMark",
            value: (data)=> data.blackmark!=null ? data.blackmark : "NIL"
        }

    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        const getDetails = async () => {
            await fetch("http://localhost:8800/warden/view-students/" + localStorage.getItem('id'), {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    return response.json()
                })
                .then(data => {
                    setData(data);
                })
                .catch(error => {
                    window.alert(error);
                    return;
                })

        };
        getDetails();
    }, [])
    return (
        <Transitions className='relative bg-white'>
            <Navbar />
            <div className='flex space-x-5'>
                <div><SideBar user="Warden" links={[
                        { label: "Dashboard", path: '/warden/' + localStorage.getItem('id'), icon: FaTachometerAlt },
                        { label: "Authenticate Student", path: "/warden/approval/" + localStorage.getItem('id'), icon: FaSignInAlt },
                        { label: "View Student Details", path: "/warden/view-student/" + localStorage.getItem('id'), icon: FaUser },
                        { label: "Mark Attendance", path: '/warden/attendance/' + localStorage.getItem('id'), icon: FaCheckSquare },
                        { label: "Update Mess Bill", path: '/warden/mess/' + localStorage.getItem('id'), icon: FaCalculator },
                        { label: "Add BlackMark",path:'/warden/bm/'+localStorage.getItem('id'),icon: FaExclamation}]} />
                </div>
                <div className='bg-white'>
                    <header className="bg-white py-6">
                        <div className="container mx-auto px-4">
                            <h1 className="text-gray-800 text-3xl font-bold my-3">
                                List of Students in the Hostel
                            </h1>
                        </div>
                    </header>
                    <DataTable headers={headers} generateData={data} />
                </div>
            </div>
        </Transitions>
    )
}

export default ViewStudent
