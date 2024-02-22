import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Transitions from '../components/Transitions'
const StudentLoginPage = () => {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  const handleUname = (e) => {
    setUname(e.target.value);
  }
  const handlePass = (e) => {
    setPass(e.target.value);
  }
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uname === "") {
      swal("Validation Error","Enter a valid username","error")
      return;
    } else if (pass === "") {
      swal("Validation Error","Enter a valid password","error")
      return;
    }
    await fetch("http://localhost:8800/student/login", {
      method: 'POST',
      body: JSON.stringify({
        username: uname,
        password: pass
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json()
      })
      .then(data => {
        const result = data.result
        const token = data.token
        const id = data.id
        if (result === 'SUCCESS' && token === 'studentstudent') {
          localStorage.clear();
          localStorage.setItem('user-token', token);
          localStorage.setItem('id', id)
          swal("Successfully Logged in","","success")
          navigate('/student/' + id);
        } else if(result === 'WAIT') {
          swal("Please try after sometime","Your registration is yet to be approved by the warden","warning")
        }else {
          swal("Error","Username or password is incorrect","error")
        }
      })
      .catch(error => {
        window.alert(error);
        return;
      })
  }
  return (
    <Transitions>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Login
          </h2>
          <form className='mt-6'>
            <div className='mb-2'>
              <label className='block text-sm font-semibold text-gray-800'>UserName:</label>
              <input type="text" name="uname" value={uname} onChange={handleUname} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' rquired></input><br></br>
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-800'>Password: </label>
              <input type="password" name="pass" value={pass} onChange={handlePass} className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40' required ></input><br></br>
            </div>
            {error &&
              <div className='text-red-500 font-serif'>
                {error}
              </div>}
            <div>Haven't registed yet? <Link to='/student-register'className='text-blue-800 underline'>Click here</Link> to register.</div>
            <div className='mt-6'>
              <input type="submit" value="Submit" onClick={handleSubmit} className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'></input>
            </div>

          </form>
        </div>
      </div>
    </Transitions>
  )
}

export default StudentLoginPage
