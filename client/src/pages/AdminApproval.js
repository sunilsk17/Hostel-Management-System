import React, { useEffect, useState } from 'react'
import AdminSideBar from "../components/SideBar"
import { useNavigate } from 'react-router-dom'
import ApprovalComponent from '../components/ApprovalComponent'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { FaTachometerAlt, FaKey, FaUserCircle, FaUsersCog, FaBed } from 'react-icons/fa'
import Transitions from '../components/Transitions'


const AdminApproval = () => {
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

  const [details, setDetails] = useState([])

  useEffect(() => {
    const getDetails = async () => {
      await fetch("http://localhost:8800/admin/approval", {
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

  let renderedItems;
  const headers = [
    {
      label: 'Name',
      value: (data) => data.name
    }, {
      label: "Gender",
      value: (data) => data.gender
    },
    {
      label: 'E-mail',
      value: (data) => data.email
    },
    {
      label: 'Mobile',
      value: (data) => data.mobile
    }, {
      label: "Blood Group",
      value: (data) => data.bloodgroup
    }, {
      label: "College Name",
      value: (data) => data.clgname
    },
    {
      label: "Hostel",
      value: (data) => data.hostel
    }
    , {
      label: "Address",
      value: (data) => data.address
    },
    {
      label: "City",
      value: (data) => data.city
    }

  ];
  if (details.message !== "Nothing") {
    renderedItems = details.map((detail) => {
      return <ApprovalComponent data={detail} headers={headers} />
    })
  } else {
    renderedItems = (<div style={{border:"1px solid gray"}} className='flex-1 uppercase text-green-600 border rounded font-serif shadow-lg p-8 tracking-widest m-10 font-bold text-2xl'>Everything up to date...</div>)
  }
  return (
    <Transitions>
      <Navbar />
      <div className='flex space-x-10'>
        <div>
          <SideBar user="Admin" links={[
            { label: "DashBoard", path: '/admin', icon: FaTachometerAlt },
            { label: "Authenticate Warden", path: "/admin/approval", icon: FaKey },
            { label: "View Warden Details", path: "/admin/view-warden", icon: FaUserCircle },
            { label: "Enable Room Allocation", path: "/admin/enable-room", icon: FaBed },
            { label: "View Student Details", path: '/admin/view-student', icon: FaUsersCog }
          ]} /></div>
        <div>
          {renderedItems}
        </div>


      </div>
    </Transitions>
  )
}

export default AdminApproval
