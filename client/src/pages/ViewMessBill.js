import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { FaTachometerAlt, FaBed, FaUserCheck, FaFileInvoice, FaMinusCircle } from 'react-icons/fa'
import Transitions from '../components/Transitions';
import swal from 'sweetalert';
const ViewMessBill = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn])
  const [data, setData] = useState({
    month: "",
    year: ""
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = async () => {
    if(data.month === ''){
      swal("Select Month","","warning")
      return;
    }else if(data.year === ''){
      swal("Select Year","","warning")
      return;
    }
    await fetch("http://localhost:8800/student/mess/" + localStorage.getItem('id'), {
      method: 'POST',
      body: JSON.stringify({
        month: data.month,
        year: data.year
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json()
      })
      .then(data => {
        if (data.message == "Error") {
          swal("Failed to Fetch Mess Bill", "", "error");
        } else {
          swal("Data Fetched Successfully", "Your Mess Bill is Rs. "+data.message, "success")
        }
      })
      .catch(error => {
        window.alert(error);
        return;
      })

  }
  return (
    <Transitions>
      <Navbar />
      <div className='flex space-x-10'>
        <div><SideBar user="Student" links={[
          { label: "Dashboard", path: "/student/" + localStorage.getItem("id"), icon: FaTachometerAlt },
          { label: "Room Allocation", path: "/student/room/" + localStorage.getItem("id"), icon: FaBed },
          { label: "View Attendance", path: "/student/attendance/" + localStorage.getItem('id'), icon: FaUserCheck },
          { label: "View Mess Bill", path: "/student/messbill/" + localStorage.getItem('id'), icon: FaFileInvoice },
          { label: 'Apply for Mess Reduction', path: '/student/reduction/' + localStorage.getItem('id'), icon: FaMinusCircle }]} /></div>
        <div>
          <table>
            <th>
              <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>View Mess Bill</td>
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
                <label className="block text-blueGray-600 text-sm font-bold mb-2">Year: </label>
              </td>
              <td>
                <select name='year' className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' onChange={handleChange}>
                  <option selected disabled>Select</option>
                  <option value='2023'>2023</option>
                </select>
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
    </Transitions>
  )
}

export default ViewMessBill
