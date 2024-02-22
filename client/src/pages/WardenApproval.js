import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import ApprovalComponent from '../components/ApprovalComponent';
import {FaTachometerAlt,FaSignInAlt,FaUser,FaCheckSquare,FaCalculator,FaExclamation} from 'react-icons/fa'
import Transitions from '../components/Transitions'
const WardenApproval = () => {
    const navigate = useNavigate();
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
    const [details, setDetails] = useState([])
    useEffect(() => {
        const getDetails = async () => {
            await fetch("http://localhost:8800/warden/approval/" + localStorage.getItem('id'), {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    return response.json()
                })
                .then(data => {
                    setDetails(data);
                })
                .catch(error => {
                    window.alert(error);
                    return;
                })
        }
        getDetails();
    }, [])
    var renderedItems;
    const headers = [
        {
            label: 'Name',
            value: (data) => data.name
        },{
          label:"Gender",
          value: (data) => data.gender
        },
        {
            label: 'E-mail',
            value: (data) => data.email
        },
        {
            label: 'Mobile',
            value: (data) => data.mobile
        },{
          label:"Blood Group",
          value: (data) => data.bloodgroup
        },{
          label:"College Name",
          value: (data) => data.college
        },
        {
            label: "Degree",
            value: (data) => data.deg
        },
        {
            label: "Roll No",
            value: (data) => data.rno
        }
        ,{
          label:"Address",
          value: (data) => data.address
        },
        {
          label:"City",
          value: (data) => data.city
        }
    
    ];
    if (details.message !== "Nothing") {
        renderedItems = details.map((detail) => {
            return <ApprovalComponent data={detail} headers={headers} />
        })
    } else {
        renderedItems = (<div className='flex-1 text-green-600 font-serif tracking-widest m-10 font-bold text-2xl'>Everything up to date...</div>)
    }
    return (
        <Transitions className='relative'>
            <Navbar />
            <div className='flex space-x-10'>
                <div><SideBar user="Warden" links={[
                        { label: "Dashboard", path: '/warden/' + localStorage.getItem('id'), icon: FaTachometerAlt },
                        { label: "Authenticate Student", path: "/warden/approval/" + localStorage.getItem('id'), icon: FaSignInAlt },
                        { label: "View Student Details", path: "/warden/view-student/" + localStorage.getItem('id'), icon: FaUser },
                        { label: "Mark Attendance", path: '/warden/attendance/' + localStorage.getItem('id'), icon: FaCheckSquare },
                        { label: "Update Mess Bill", path: '/warden/mess/' + localStorage.getItem('id'), icon: FaCalculator },
                        { label: "Add BlackMark",path:'/warden/bm/'+localStorage.getItem('id'),icon: FaExclamation}]} />
                </div>
                <div className='grid grid-cols-1'>
                    {renderedItems}
                </div>
            </div>
        </Transitions>
    )
}

export default WardenApproval

