import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import swal from 'sweetalert'
import { FaTachometerAlt, FaSignInAlt, FaUser, FaCheckSquare, FaCalculator,FaExclamation } from 'react-icons/fa'
import Transitions from '../components/Transitions'
import DataTable from '../components/DataTable';

const MarkAttendance = () => {
    const navigate = useNavigate();
    const [isRendered, setIsRendered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [arr, setArr] = useState([]);
    const [date, setDate] = useState('')
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


    const handleChange = (id, value) => {
        setArr(prevArr => prevArr.map(student => {
            if (student.id === id) {
                return {
                    ...student,
                    attendance: value
                }
            } else {
                return student
            }
        }))
    }
    const submitAttendance = async (e) => {
        e.preventDefault();
        swal("Attendance Marked Successfully", "", "success")
        setIsRendered(false);
        await fetch("http://localhost:8800/warden/attendance/" + localStorage.getItem('id'), {
            method: 'POST',
            body: JSON.stringify({
                date: date,
                arr: arr
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .then(data => {
                if (data.message === 'SUCCESS') {
                    
                }
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8800/warden/students/" + localStorage.getItem('id'), {
            method: 'POST',
            body: JSON.stringify({
                date: date
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json()
            })
            .then(data => {
                if (data.message === 'AE') {
                    swal("Error", "Attendance already taken", "error");
                } else {
                    setArr(data);
                    setIsRendered(true);
                }
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    const headers = [
        {
            label: 'Name',
            value: (data) => data.name
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
            label: "Attendance",
            value: (data) => <div><input type="checkbox" onChange={(e) => handleChange(data.id, e.target.checked)}></input></div>
        },

    ];
    return (
        <Transitions>
            <Navbar />
            <div className='flex space-x-10'>
                <div><SideBar user="Warden" links={[
                        { label: "Dashboard", path: '/warden/' + localStorage.getItem('id'), icon: FaTachometerAlt },
                        { label: "Authenticate Student", path: "/warden/approval/" + localStorage.getItem('id'), icon: FaSignInAlt },
                        { label: "View Student Details", path: "/warden/view-student/" + localStorage.getItem('id'), icon: FaUser },
                        { label: "Mark Attendance", path: '/warden/attendance/' + localStorage.getItem('id'), icon: FaCheckSquare },
                        { label: "Update Mess Bill", path: '/warden/mess/' + localStorage.getItem('id'), icon: FaCalculator },
                        { label: "Add BlackMark",path:'/warden/bm/'+localStorage.getItem('id'),icon: FaExclamation}]} /></div>
                <div>
                    <table>
                        <th>
                            <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>Mark Attendance</td>
                        </th>
                        <tr>
                            <td><label className="block  text-blueGray-600 text-sm font-bold mb-2">
                                Date
                            </label></td>
                            <td><input
                                type="date"
                                name='date'
                                value={date}
                                required
                                onChange={(e) => { setDate(e.target.value); console.log(date) }}
                                className='border border-gray-400 rounded-lg px-6 py-2 min-w-full'
                            /></td>
                        </tr>
                        <tr>
                            <td className='col-span-2'>
                                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={handleSubmit}>Submit</button>
                            </td>
                        </tr>
                    </table>
                    <div className="">
                        <div>
                            {isRendered &&
                                <div className='flex flex-col items-center'>
                                    <DataTable generateData={arr} headers={headers} />
                                    <br></br>
                                    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={submitAttendance}>Mark Attendance
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </Transitions>
    )
}

export default MarkAttendance
