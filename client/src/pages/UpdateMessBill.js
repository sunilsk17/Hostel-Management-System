import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar';
import swal from 'sweetalert'
import { FaTachometerAlt, FaSignInAlt, FaUser, FaCheckSquare, FaCalculator,FaExclamation } from 'react-icons/fa'
import Transitions from '../components/Transitions'

const UpdateMessBill = () => {
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

    const [data, setData] = useState({
        month: "",
        year: "",
        amount: ""
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.month === '') {
            swal("Error", "Select Month", "error");
            return;
        } else if (data.year === '') {
            swal("Error", "Select Year", "error");
            return;
        } else if (data.amount === '') {
            swal("Error", "Enter amount", "error");
            return;
        }
        await fetch("http://localhost:8800/warden/mess/" + localStorage.getItem('id'), {
            method: 'POST',
            body: JSON.stringify({
                month: data.month,
                year: data.year,
                amount: data.amount
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

                    swal("Mess Bill Updated Successfully", "", "success")
                } else if (data.message === 'AE') {
                    swal("Mess Bill already updated", "", "warning")
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
                                <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>Update Mess Bill</td>
                            </th>
                            <tr>
                                <td><label className="block text-blueGray-600 text-sm font-bold mb-2">Select Month: </label></td>
                                <td><select name='month' className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' onChange={handleChange}>
                                    <option selected disabled>Select </option>
                                    <option value='1'>January</option>
                                    <option value='2'>February</option>
                                    <option value='3'>March</option>
                                    <option value='4'>April</option>
                                    <option value='5'>May</option>
                                    <option value='6'>June</option>
                                    <option value='7'>July</option>
                                    <option value='8'>August</option>
                                    <option value='9'>September</option>
                                    <option value='10'>October</option>
                                    <option value='11'>November</option>
                                    <option value='12'>December</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="block  text-blueGray-600 text-sm font-bold mb-2">Year: </label>
                                </td>
                                <td>
                                    <select name='year' className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' onChange={handleChange}>
                                        <option selected disabled>Select</option>
                                        <option value='2023'>2023</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="block  text-blueGray-600 text-sm font-bold mb-2">Enter Total Bill Amount: </label>
                                </td>
                                <td>
                                    <input type='number' className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' name='amount' onChange={handleChange}></input>
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

export default UpdateMessBill
