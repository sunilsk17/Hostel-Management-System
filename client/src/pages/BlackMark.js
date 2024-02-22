import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import swal from 'sweetalert'
import { FaTachometerAlt, FaSignInAlt, FaUser, FaCheckSquare, FaCalculator, FaAccusoft,FaExclamation } from 'react-icons/fa'
import Transitions from '../components/Transitions'

const BlackMark = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [students,setStudents] = useState([]);
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
                    setStudents(data);
                })
                .catch(error => {
                    window.alert(error);
                    return;
                })

        };
        getDetails();
    }, [])
    const [data, setData] = useState({
        name: "",
        blackmark: "",
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.name=== '') {
            swal("Error", "Select Student Name", "error");
            return;
        } else if (data.blackmark === '') {
            swal("Error", "Enter data", "error");
            return;
        }
        console.log(data)
        await fetch("http://localhost:8800/warden/bm/" + localStorage.getItem('id'), {
            method: 'POST',
            body: JSON.stringify({
                name:data.name,
                blackmark:data.blackmark
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
                    swal("Updated Successfully", "", "success")
                } else if (data.message === 'AE') {
                    swal("Failed", "", "warning")
                }
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    return (
        <Transitions>
            <div className='relative'>
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
                    <div>
                        <table>
                            <th>
                                <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>Add Blackmark</td>
                            </th>
                            <tr>
                                <td><label className="block text-blueGray-600 text-sm font-bold mb-2">Select Student: </label></td>
                                <td><select name='name' className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' onChange={handleChange}>
                                    <option selected disabled>Select </option>
                                    {students.map((student)=>{
                                        return <option value={student.name}>{student.name}</option>
                                    })}
                                </select></td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="block  text-blueGray-600 text-sm font-bold mb-2" >Enter blackmark: </label>
                                </td>
                                <td>
                                    <input type='text' name='blackmark' onChange={handleChange} className='border border-gray-400 rounded-lg px-6 py-2 min-w-full'></input>
                                </td>
                            </tr>
                            <tr>
                                <td className='col-span-2 text-center'>
                                    <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={handleSubmit}>Submit</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </Transitions>
    )
}

export default BlackMark
