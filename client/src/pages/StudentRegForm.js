import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import Transitions from '../components/Transitions'
const StudentRegForm = () => {
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();
  var minDate = year + '-' + month + '-' + day;
  const maxDate = "2008-12-31";
  var validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var validMobile = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  var validPcode = /^\d{6}$/;
  var validPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const [details, setdetails] = useState({
    name: "",
    email: "",
    dob: "",
    mobile: "",
    gender: "",
    bloodgroup: "",
    clgname: "",
    rollno: "",
    degree: "",
    year: "",
    semester: "",
    joindate: "",
    fname: "",
    fphone: "",
    foccupation: "",
    mname: "",
    mphone: "",
    moccupation: "",
    address: "",
    city: "",
    country: "",
    pcode: "",
    password: ""
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details.name === '') {
      swal("Validation Error", "Please enter your name", "error");
    } else if(!details.email.match(validEmail)){
      swal("Validation Error", "Please enter a valid email", "error");
    }else if(details.dob === '' || details.dob>maxDate){
      swal("Validation Error", "Please enter a valid Date of Birth", "error");
    }else if(!details.mobile.match(validMobile)){
      swal("Validation Error", "Please enter a valid mobile number", "error");
    }else if(details.gender === ''){
      swal("Validation Error", "Please select a gender", "error");
    }else if(details.bloodgroup === ''){
      swal("Validation Error", "Please select a Bloodgroup", "error");
    }else if(details.clgname === ''){
      swal("Validation Error", "Please select College Name", "error");
    }else if(details.degree === ''){
      swal("Validation Error", "Please select Degree", "error");
    }else if(details.year === '' || details.year <=0 || details.year > 5){
      swal("Validation Error", "Please enter a valid year of study", "error");
    }else if(details.semester === '' || details.semester < (details.year*2 - 1) || details.semester > (details.year * 2)){
      swal("Validation Error", "Please enter valid value for semester field", "error");
    }else if(!details.rollno.match(validMobile)){
      swal("Validation Error", "Please enter valid Roll Number", "error");
    }
    else if(details.joindate === '' || details.joindate < minDate){
      swal("Validation Error", "Please enter valid Joining Date", "error");
    }
    else if(details.fname === ''){
      swal("Validation Error", "Please enter your father's name", "error");
    }else if(details.foccupation === ''){
      swal("Validation Error", "Please enter your father's occupation", "error");
    }else if(details.mname === ''){
      swal("Validation Error", "Please enter your mother's name", "error");
    }else if(details.moccupation === ''){
      swal("Validation Error", "Please enter your mother's occupation", "error");
    }else if(!details.fphone.match(validMobile)){
      swal("Validation Error", "Father's Mobile Number is invalid", "error");
    }else if(!details.mphone.match(validMobile)){
      swal("Validation Error", "Mother's Mobile Number is invalid", "error");
    }else if(details.country === ''){
      swal("Validation Error", "Please enter your country", "error");
    }else if(details.address === ''){
      swal("Validation Error", "Please enter your address", "error");
    }else if(details.city === ''){
      swal("Validation Error", "Please enter your city", "error");
    }else if(!details.pcode.match(validPcode)){
      swal("Validation Error", "Please enter a valid PIN code", "error");
    }else if(!details.password.match(validPassword)){
      swal("Validation Error", "Please enter a valid Password. The password must contain atleast 8 characters including Lowercase, Uppercase, Number and a special symbol", "error");
    }
    else {
      await fetch("http://localhost:8800/student-register", {
        method: 'POST',
        body: JSON.stringify({
          ...details
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        return response.json()
      }).then(data => {
        const message = data.message
        if (message === 'AE') {
          swal("Error","User Already Registered","warning");
        } else if(message ==='SUCCESS'){
          swal("Successfully registered","You will be able to login once the warden approves your request","success")
          navigate('/')
        }
      }).catch(error => {
        window.alert(error);
        return;
      })
    }
  }



  return (
    <Transitions>
      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t text-white mb-0 px-6 py-6  bg-purple-800">
              <div className="text-center flex justify-between ">
                <h6 className="text-blueGray-700 text-xl font-bold">Register as Student</h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Student Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Name
                      </label>
                      <input required
                        type="text"
                        name='name'
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Email address
                      </label>
                      <input
                        required
                        type="email"
                        name='email'
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name='dob'
                        max={maxDate}
                        required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="number"
                        name='mobile'
                        onChange={handlechange} required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label>
                        Gender
                      </label>
                      <select name='gender' className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        htmlfor="grid-password" required
                        onChange={handlechange}>
                        <option disabled selected>Select Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Blood Group
                      </label>
                      <select name='bloodgroup' required className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" onChange={handlechange}>
                        <option disabled selected>Select Blood Group</option>
                        <option value='O+' >O+</option>
                        <option value='O-' >O-</option>
                        <option value='A+' >A+</option>
                        <option value='B+' >B+</option>
                        <option value='A-' >A-</option>
                        <option value='B-' >B-</option>
                        <option value='AB+' >AB+</option>
                        <option value='AB-' >AB-</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br></br>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  College Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        College Name
                      </label>
                      <select name='clgname' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option disabled selected>Select</option>
                        <option value='CEG'>CEG</option>
                      </select>

                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Roll Number
                      </label>
                      <input
                        type="number" required
                        name='rollno'
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="jesse@example.com"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Degree
                      </label>
                      <select name='degree' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                        <option disabled selected>Select Degree</option>
                        <option value='B.E Computer Science and Eng.'>B.E Computer Science and Eng.</option>
                        <option value='B.E Civil Science and Eng.'>B.E Civil Science and Eng.</option>
                        <option value='B.E Electrical and Electronical and Eng.'>B.E Electrical and Electronical and Eng.</option>
                        <option value='B.E Biomedical and Eng.'>B.E Biomedical and Eng.</option>
                        <option vlaue='B.E Electronics and communication and Eng.'>B.E Electronics and communication and Eng.</option>
                        <option value='B.Tech Information Technology.'>B.Tech Information Technology.</option>
                        <option value='M.E Computer Science and Eng.'>M.E Computer Science and Eng.</option>
                        <option value='M.E Civil Science and Eng.'>M.E Civil Science and Eng.</option>
                        <option value='M.E Electrical and Electronical and Eng.'>M.E Electrical and Electronical and Eng.</option>
                        <option value='M.E Biomedical and Eng.'>M.E Biomedical and Eng.</option>
                        <option value='M.E Electronics and communication and Eng.'>M.E Electronics and communication and Eng.</option>
                        <option value='M.Tech Information Technology.'>M.Tech Information Technology.</option>
                        <option value='MSC Integrated CS/IT'>MSC Integrated CS/IT</option>
                        <option value='PHD'>PHD</option>
                      </select>

                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Year
                      </label>
                      <input
                        type="number"
                        name='year' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label>
                        Semester
                      </label>
                      <input
                        type="number"
                        name='semester' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Joining date
                      </label>
                      <input
                        min={minDate}
                        type="date"
                        name='joindate' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                </div>
                <br></br>

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Family Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Father Name
                      </label>
                      <input
                        type="text"
                        name='fname' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Father Mobile Number
                      </label>
                      <input
                        type="number"
                        name='fphone'
                        onChange={handlechange} required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="jesse@example.com"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Father Occupation
                      </label>
                      <input
                        type="text"
                        name='foccupation'
                        onChange={handlechange} required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Mother Name
                      </label>
                      <input
                        type="text"
                        name='mname'
                        onChange={handlechange} required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Mother Mobile Number
                      </label>
                      <input
                        type="number"
                        name='mphone'
                        onChange={handlechange} required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue="jesse@example.com"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Mother Occupation
                      </label>
                      <input
                        type="text"
                        name='moccupation'
                        onChange={handlechange} required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Contact Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name='address' required onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name='city' required onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Country
                      </label>
                      <input
                        type="text" onChange={handlechange}
                        name='country' required
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Postal Code
                      </label>
                      <input
                        type="number"
                        name='pcode' required onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Login Credentials
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Enter Password for your account
                      </label>
                      <input
                        type="password"
                        name='password' onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='mx-10'>
            <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600' onClick={handleSubmit}>Submit</button>

            </div>
            <br>
            </br>
          </div>


        </div>
      </section>

    </Transitions>
  )
}

export default StudentRegForm
