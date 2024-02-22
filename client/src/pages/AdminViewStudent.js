import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
import { FaTachometerAlt, FaKey, FaUserCircle, FaUsersCog, FaBed } from 'react-icons/fa'
import Transitions from '../components/Transitions'
import swal from 'sweetalert'
import DataTable from '../components/DataTable'
const AdminViewStudent = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const [data, setData] = useState({
    hostel: ""
  })
  const [arr, setArr] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
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
  const handleSubmit = async () => {
    if(data.hostel === ''){
      swal("Please select Hostel","","warning");
      return;
    }
    await fetch("http://localhost:8800/admin/view-students/", {
      method: 'POST',
      body: JSON.stringify({
        hostel: data.hostel
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json()
      })
      .then(data => {
        swal("Data fetched Successfully", "", "success")
        setArr(data);
        setIsRendered(true);
      })
      .catch(error => {
        window.alert(error);
        return;
      })

  }
  return (
    <Transitions>
      <Navbar />
      <div className='flex flex-row'>
        <div>
          <SideBar user="Admin" links={[
            { label: "DashBoard", path: '/admin', icon: FaTachometerAlt },
            { label: "Authenticate Warden", path: "/admin/approval", icon: FaKey },
            { label: "View Warden Details", path: "/admin/view-warden", icon: FaUserCircle },
            { label: "Enable Room Allocation", path: "/admin/enable-room", icon: FaBed },
            { label: "View Student Details", path: '/admin/view-student', icon: FaUsersCog }
          ]} />
        </div>
        <div>
          <table>
            <th>
              <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>View Student Details</td>
            </th>
            <tr>
              <td><label className="block text-blueGray-600 text-sm font-bold mb-2">Select Hostel: </label></td>
              <td><select name='hostel' className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' onChange={handleChange}>
                <option selected disabled>Select </option>
                <option value='kurinji'>Kurinji</option>
                <option value='mullai'>Mullai</option>
              </select></td>
            </tr>
            <tr>
              <td className='col-span-2 text-center'>
                <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={handleSubmit}>View</button>
              </td>
            </tr>
          </table>
          <div>
            <div>
              {isRendered &&
                <div className='flex flex-col items-center'>
                  <DataTable generateData={arr} headers={headers} />
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    </Transitions>
  )
}

export default AdminViewStudent
