import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { FaTachometerAlt, FaBed, FaUserCheck, FaFileInvoice, FaMinusCircle } from 'react-icons/fa'
import Transitions from '../components/Transitions';
import swal from 'sweetalert';
const ViewAttendance = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [doj,setDoj] = useState(new Date());
  useEffect(()=>{
    const fetchDoj = async()=>{
      await fetch("http://localhost:8800/student/doj/" + localStorage.getItem('id'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json()
      })
      .then(data => {
        setDoj(new Date(data.doj));
      })
      .catch(error => {
        window.alert(error);
        return;
      })
    }
    fetchDoj();
  },[])
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
  const [arr, setArr] = useState({
    present: [],
    reduction: []
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
    await fetch("http://localhost:8800/student/attendance/" + localStorage.getItem('id'), {
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
        setData({ ...data, month: data.month, year: data.year })
        setArr({ ...arr, present: data.present, reduction: data.reduction })
        setIsRendered(true);
      })
      .catch(error => {
        window.alert(error);
        return;
      })

  }
  const getBoxColor = (date) => {
    if (arr.reduction.includes(date.getDate())) {
      return 'bg-yellow-500 text-white';
    }
    if (date > currentDate ) {
      return 'bg-gray-300 text-white';
    }
    if (arr.present.includes(date.getDate())) {
      return 'bg-green-600 text-white';
    }
    return 'bg-red-400 text-white';
  };
  const renderAttendanceSheet = () => {
    const daysInMonth = new Date(data.year, data.month, 0).getDate();
    const firstDayOfMonth = new Date(data.year, data.month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const attendanceSheet = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      attendanceSheet.push(
        <div
          key={`empty-${i}`}
          className="w-12 h-12 flex items-center justify-center"
        ></div>
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(data.year, data.month - 1, day);
      const doj2 = new Date(doj.getFullYear(),doj.getMonth(),doj.getDate())
      const boxColor = date < doj2 ? 'bg-white text-black' : getBoxColor(date);
      const formattedDate = date.toLocaleString('en-US', { day: 'numeric' });
      const formattedDay = date.toLocaleString('en-US', { weekday: 'short' });
      attendanceSheet.push(
        <div
          key={day}
          className={`w-12 h-12 flex flex-col items-center justify-center ${boxColor}`}
        >
          <div className="text-sm font-bold">{formattedDate}</div>
          <div className="text-xs">{formattedDay}</div>
        </div>
      );
    }

    return attendanceSheet;
  };
  return (
    <Transitions>
      <Navbar />
      <div className='flex'>
        <div>
          <SideBar user="Student" links={[
            { label: "Dashboard", path: "/student/" + localStorage.getItem("id"), icon: FaTachometerAlt },
            { label: "Room Allocation", path: "/student/room/" + localStorage.getItem("id"), icon: FaBed },
            { label: "View Attendance", path: "/student/attendance/" + localStorage.getItem('id'), icon: FaUserCheck },
            { label: "View Mess Bill", path: "/student/messbill/" + localStorage.getItem('id'), icon: FaFileInvoice },
            { label: 'Apply for Mess Reduction', path: '/student/reduction/' + localStorage.getItem('id'), icon: FaMinusCircle }]} /></div>
        <div className='flex justify-between items-center ml-20'>
          <table>
            <th>
              <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>View Attendance</td>
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
          <div>
            {isRendered && <div className="grid grid-cols-7 gap-2 ml-20 mt-20">
              <div className="text-xs font-bold text-center">Sun</div>
              <div className="text-xs font-bold text-center">Mon</div>
              <div className="text-xs font-bold text-center">Tue</div>
              <div className="text-xs font-bold text-center">Wed</div>
              <div className="text-xs font-bold text-center">Thu</div>
              <div className="text-xs font-bold text-center">Fri</div>
              <div className="text-xs font-bold text-center">Sat</div>
              {renderAttendanceSheet()}
            </div>}
          </div>

        </div>
      </div>
    </Transitions>
  )
}

export default ViewAttendance
