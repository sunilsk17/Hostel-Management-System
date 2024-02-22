import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import swal from 'sweetalert';
import {FaTachometerAlt,FaBed,FaUserCheck, FaFileInvoice ,FaMinusCircle} from 'react-icons/fa'
import Transitions from '../components/Transitions';

const ApplyMessReduction = () => {
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
    from: '',
    to: ''
  })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate() + 1;
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();
  var minDate = year + '-' + month + '-' + day;
  var lastDay = new Date(dtToday.getFullYear(), dtToday.getMonth() + 1, 0);
  var lmonth = lastDay.getMonth();
  var ldate = lastDay.getDate();
  var lyear = lastDay.getFullYear();
  if (lmonth < 10)
    lmonth = month.toString();
  if (ldate < 10)
    ldate = '0' + ldate.toString();
  var maxDate = lyear + '-' + lmonth + '-' + ldate;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.from === '' || data.to === '' || data.from > data.to) {
      swal("Error", "Enter valid Dates", "error");
    }else{
      await fetch("http://localhost:8800/student/apply-reduction/" + localStorage.getItem('id'), {
      method: 'POST',
      body: JSON.stringify({
        from: data.from,
        to: data.to,
        num: data.num
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
          swal("Applied Successfully","","success");
          setData({from:'',to:'',num:''})
        }else if(data.message === 'AE'){
          swal("Warning","Mess Reduction Already Applied","warning")
        }
      })
      .catch(error => {
        window.alert(error);
        return;
      })
    }
    
  }
  return (
    <Transitions>
      <Navbar />
      <div className='flex space-x-10'>
        <div><SideBar user="Student"  links={[
          { label: "Dashboard", path: "/student/"+localStorage.getItem("id") , icon: FaTachometerAlt},
          { label: "Room Allocation", path: "/student/room/"+localStorage.getItem("id"),icon: FaBed },
          {label:"View Attendance",path:"/student/attendance/"+localStorage.getItem('id'), icon: FaUserCheck},
          {label:"View Mess Bill", path:"/student/messbill/"+localStorage.getItem('id'),icon: FaFileInvoice},
          {label:'Apply for Mess Reduction',path:'/student/reduction/'+localStorage.getItem('id'), icon: FaMinusCircle}]  }/>
        </div>
        <div>
          <table>
            <th>
              <td className='col-span-2 text-2xl uppercase text-center text-gray-500'>Apply for Mess Reduction</td>
            </th>
            <tr>
              <td>
              <label className="block  text-blueGray-600 text-sm font-bold mb-2">From:</label>
              </td>
              <td>
              <input className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' type='date' value={data.from} name='from' min={minDate} max={maxDate} onChange={handleChange}></input>
              </td>
            </tr>
            <tr>
              <td>
              <label className="block  text-blueGray-600 text-sm font-bold mb-2">To: </label>
              </td>
              <td>
              <input className='border border-gray-400 rounded-lg px-6 py-2 min-w-full' type='date' value={data.to} name='to' min={minDate} max={maxDate} onChange={handleChange}></input>
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

export default ApplyMessReduction
