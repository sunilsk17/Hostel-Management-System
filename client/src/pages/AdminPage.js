import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'
import { Chart } from 'chart.js'
import { FaTachometerAlt, FaKey, FaUserCircle, FaUsersCog, FaBed, FaUserShield, FaUsers, FaBuilding } from 'react-icons/fa'
import Transitions from '../components/Transitions'
import {MdRamenDining} from 'react-icons/md'
import {GrUserWorker} from 'react-icons/gr'
const AdminPage = () => {
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


  return (
    <Transitions>
      <Navbar />
      <div className='flex'>
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
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
              <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-pink-600"><FaUserShield /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">No. Wardens</h2>
                    <p class="font-bold text-3xl">3+ <span class="text-pink-500"></span></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
              <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-yellow-600"><FaUsers /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">No. of  Students</h2>
                    <p class="font-bold text-3xl">3+ <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
              <div class="bg-gradient-to-b from-purple-200 to-purple-100 border-b-4 border-purple-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-purple-600"><FaBuilding /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">No. of Hostels</h2>
                    <p class="font-bold text-3xl">3+</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
              <div class="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-indigo-600"><FaBed style={{ size: "20" }} /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">No. of Rooms</h2>
                    <p class="font-bold text-3xl">10+</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
              <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-green-600"><MdRamenDining style={{ size: "30" }} /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">No. of Mess</h2>
                    <p class="font-bold text-3xl">2+</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/2 xl:w-1/3 p-6">
              <div class="bg-gradient-to-b from-orange-200 to-orange-100 border-b-4 border-orange-500 rounded-lg shadow-xl p-5">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink pr-4">
                    <div class="rounded-full p-5 bg-orange-600"><GrUserWorker style={{ size: "20" }} /></div>
                  </div>
                  <div class="flex-1 text-right md:text-center">
                    <h2 class="font-bold uppercase text-gray-600">No. of Employees</h2>
                    <p class="font-bold text-3xl">2+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </Transitions>
  )
}

export default AdminPage
