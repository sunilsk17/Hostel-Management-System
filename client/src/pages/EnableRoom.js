import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom'
import {FaTachometerAlt,FaKey,FaUserCircle,FaUsersCog,FaBed} from 'react-icons/fa'
import swal from 'sweetalert'
import Transitions from '../components/Transitions'
const EnableRoom = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isEnable, setIsEnabled] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (userToken === 'adminadmin') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            navigate('/');
        }
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn])

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
            }
        })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    useEffect(() => {
        checkIfEnabled();
    }, [isEnable])
    const handleClick = async () => {
        if(isEnable) swal("Disabled Successfully","","success")
                else swal("Enabled Successfully","","success")
        await fetch("http://localhost:8800/admin/room-enable", {
            method: 'POST',
            body: JSON.stringify({
                value: isEnable ? 0 : 1
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json()
        }).then(data => {
            const message = data.message
            if (message === 'SUCCESS') {
                
                setIsEnabled(!isEnable);
            } else {
                setIsEnabled(!isEnable);
            }
        }).catch(error => {
            window.alert(error);
            return;
        })
    }
    return (
        <Transitions>
            <Navbar />
            <div className='flex space-x-8'>
                <div>
                <SideBar user="Admin" links={[
            { label: "DashBoard", path: '/admin',icon:FaTachometerAlt },
            { label: "Authenticate Warden", path: "/admin/approval",icon:FaKey },
            { label: "View Warden Details", path: "/admin/view-warden",icon: FaUserCircle },
            { label: "Enable Room Allocation", path: "/admin/enable-room", icon: FaBed },
            { label: "View Student Details", path: '/admin/view-student', icon: FaUsersCog }
          ]} />
                </div>
                <div className='mt-20'>
                    {isEnable ? <div className='uppercase font-mont text-lg font-bold shadow-lg p-8'> Room allocation process is currently enabled. Click below to disable</div> :
                        <div className='uppercase shadow-lg p-8 font-gilda font-bold'>Room allocation process is currently disabled. Click below to enable</div>}
                    <br></br>
                    <button onClick={handleClick} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Enable / Disable</button>
                </div>
            </div>
        </Transitions>
    )
}

export default EnableRoom
