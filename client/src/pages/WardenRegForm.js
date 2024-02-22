import React, { useState } from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
const WardenRegForm = () => {
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
    dept: "",
    degree: "",
    aoresearch: "",
    address: "",
    city: "",
    country: "",
    pcode: "",
    password:""
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  const handleSubmit = async (e)=>{
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
    }else if(details.aoresearch === '' ){
      swal("Validation Error", "Please enter your area of research", "error");
    }else if(details.dept === '' ){
      swal("Validation Error", "Please select your department", "error");
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
      await fetch("http://localhost:8800/warden-register", {
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
          swal("Successfully registered","You will be able to login once the admin approves your request","success")
          navigate('/')
        }
      }).catch(error => {
        window.alert(error);
        return;
      })
    }
  }


  return (
    <div className=''>
      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t text-white mb-0 px-6 py-6 bg-purple-800">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">Register as Warden</h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Warden Information
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
                      max={maxDate}
                        type="date"
                        name='dob'
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
                        <option selected disabled>Select College</option>
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
                        Department
                      </label>
                      <select name='dept' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option selected disabled>Select Department</option>
                        <option value='Computer Science and Engineering'>Computer Science and Engineering</option>
                        <option value='Information Science and Technology'>Information Science and Technology</option>
                        <option value='Electornics and Communication Engineering'>Electornics and Communication Engineering</option>
                        <option value='Electrical and Electronics Engineering'>Electrical and Electronics Engineering</option>
                        <option value='Civil Engineering'>Civil Engineering</option>
                        <option value='Mechanical Engineering'>Mechanical Engineering</option>
                        <option value='Industrial Engineering'>Industrial Engineering</option>
                        <option value='BioMedical Engineering'>BioMedical Engineering</option>
                        <option value='Printing and Packaging Tehnology'>Printing and Packaging Tehnology</option>
                        <option value='Manufacturing Engineering'>Manufacturing Engineering</option>
                        <option value='Mining Engineering'>Mining Engineering</option>
                      </select>
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
                        <option value='PhD'>PhD</option>
                      </select>

                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                      >
                        Area of Research
                      </label>
                      <input
                        type="text"
                        name='aoresearch' required
                        onChange={handlechange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"

                      />
                    </div>
                  </div>
                </div>
                <br></br>
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
                        type="text" onChange={handlechange}
                        name='address' required
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
                        type="text" onChange={handlechange}
                        name='city' required
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
                        type="number" onChange={handlechange}
                        name='pcode' required
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

    </div>
  )
}

export default WardenRegForm

