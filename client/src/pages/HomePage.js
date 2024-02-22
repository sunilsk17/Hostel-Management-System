import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import Transitions from '../components/Transitions'
import SwimmingPool from './images/swimmingpool.jpg'
import Badminton from './images/badminton.jpg'
import Internet from './images/internet.jpg'
import Parking from './images/parking.jpg'
import RoomService from './images/roomservice.jpg'
import Water from './images/water.jpg'
import Pic1 from './images/pic1.jpg'
import Pic2 from './images/pic2.jpg'
import HostelDay from './images/hostelday.jpg'
import Pic3 from './images/pic3.jpg'
import SportsDay from './images/sportsday.jpg'
import Pic4 from './images/pic4.jpg'
import MovieNight from './images/movienight.jpg'
import Pic5 from './images/pic5.jpg'
import Logo from './images/23494797.jpg'
import Pic6 from './images/pic6.jpg'
import underline from './images/decorated.svg'
const HomePage = () => {
  useEffect(() => {
    localStorage.clear();
  })
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('#dropdownNavbarLink') && !event.target.closest('#dropdownNavbar')) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const data = [
    {
      image: SwimmingPool,
      content: "Swimming Pool"
    }, {
      image: Internet,
      content: "High Speed Fibernet"
    }, {
      image: Badminton,
      content: 'Tennis Courts'
    }, {
      image: Parking,
      content: "Cycle Parking Areas"
    }, {
      image: Water,
      content: "RO Drinking Water"
    }, {
      image: RoomService,
      content: "Room Service"
    }
  ]
  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }
  return (
    <Transitions>
      <div>

        <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mr-10 p-4">
            <a href="#" class="flex items-center">
              <img src={Logo} class="h-8 mr-3" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CEG Hostels</span>
            </a>
            <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
              <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" class="block py-2 pl-3 pr-4 text-white bg-gray-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#events" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Events</a>
                </li>
                <li>
                  <a href="#gallery" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gallery</a>
                </li>
                <li>
                  <a href="#amenities" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Amenities</a>
                </li>
                <li>
                  <a href="#footer" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li>
                <li>
                  <button id="dropdownNavbarLink" onClick={toggleDropdown} data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Login <svg class="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                  <div id="dropdownNavbar" className={`z-10 ${isDropdownOpen ? '' : 'hidden'
                    } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700 dark:divide-gray-600 absolute`} class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                      <li>
                        <a href="/admin-login" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin</a>
                      </li>
                      <li>
                        <a href="/warden-login" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Warden</a>
                      </li>
                      <li>
                        <a href="/student-login" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Student</a>
                      </li>
                    </ul>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </nav>

        <section className="bg-[url('pages/images/main3.jpg')]   bg-no-repeat min-h-[640px] mx-auto px-3 flex items-center py-16 mt-0 bg-center h-screen bg-cover">
          <div className="container max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
            <div className="flex flex-col justify-center items-start bg-white p-5 shadow-lg border rounded-lg bg-opacity-80">
              <h3 className="text-coyote font-bold opacity-70 tracking-[.25em] font-barlow-cond text-xl sm:text-[22px] uppercase">
                welcome to
              </h3>
              <h1 className="font-gilda text-2xl sm:text-[38px] tracking-[.04em] py-3 text-gray-700 mb-3 font-bold">
                CEG Hostels
              </h1>
              <p className="opacity-70 font-gilda text-justify text-sm sm:text-lg text-black">
                CEG hostels provide hostel facilities to the students of College of Engineering Guindy which has a legacy of over 230 years. It is known for its quality service at affordable fees. It is a well-organized organization with a great set of employees who strive hard for the well-being of the students.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-3 bg-white" id='events'>
          <div className="container max-w-[1200px] mx-auto">
            <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-coyote text-center mb-3">
              Events
            </h2>
            <div className="flex items-center justify-center">
              <img src={underline} alt="" />
            </div>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 mt-10">
              <div className="min-h-[323px] relative">
                <img
                  src={HostelDay}
                  className="w-full h-full object-cover"
                />
                <div className="text-white absolute bottom-2 left-2 right-2 bg-black/50 p-5">
                  <div className="w-[70px] h-[70px] bg-lion rounded-full flex items-center justify-center flex-col uppercase font-mont text-sm absolute top-0 right-3 -translate-y-[50%]">
                    <span className="font-bold tracking-widest text-xl inline-block">
                      03
                    </span>
                    <span className="tracking-widest inline-block -mt-[3px]">
                      apr
                    </span>
                  </div>
                  <h3 className="font-gilda text-xl tracking-[.04em] uppercase">Hostel Day
                  </h3>
                  <p className="font-normal tracking-[.04em] font-barlow text-lg">
                    Enjoy the dinner - <span className="font-light">07:00 PM</span>
                  </p>
                </div>
              </div>
              <div className="min-h-[323px] relative">
                <img
                  src={MovieNight}
                  className="w-full h-full object-cover"
                />
                <div className="text-white absolute bottom-2 left-2 right-2 bg-black/50 p-5">
                  <div className="w-[70px] h-[70px] bg-lion rounded-full flex items-center justify-center flex-col uppercase font-mont text-sm absolute top-0 right-3 -translate-y-[50%]">
                    <span className="font-bold tracking-widest text-xl inline-block">
                      06
                    </span>
                    <span className="tracking-widest inline-block -mt-[3px]">
                      may
                    </span>
                  </div>
                  <h3 className="font-gilda text-xl tracking-[.04em] uppercase">
                    Movie Night
                  </h3>
                  <p className="font-normal tracking-[.04em] font-barlow text-lg">
                    Fun with friends - <span className="font-light">09:00 PM</span>
                  </p>
                </div>
              </div>
              <div className="min-h-[323px] relative">
                <img
                  src={SportsDay}
                  className="w-full h-full object-cover"
                />
                <div className="text-white absolute bottom-2 left-2 right-2 bg-black/50 p-5">
                  <div className="w-[70px] h-[70px] bg-lion rounded-full flex items-center justify-center flex-col uppercase font-mont text-sm absolute top-0 right-3 -translate-y-[50%]">
                    <span className="font-bold tracking-widest text-xl inline-block">
                      10
                    </span>
                    <span className="tracking-widest inline-block -mt-[3px]">
                      jun
                    </span>
                  </div>
                  <h3 className="font-gilda text-xl tracking-[.04em] uppercase">
                    Sports Day
                  </h3>
                  <p className="font-normal tracking-[.04em] font-barlow text-lg">
                    Test your skills -{" "}
                    <span className="font-light">06:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-3 bg-light-gray" id='gallery'>
          <div className="container max-w-[1200px] mx-auto">
            <h2 className="font-gilda font-normal text-3xl text-[46px] tracking-[.04em] text-coyote text-center mb-3">
              Gallery
            </h2>
            <div className="flex items-center justify-center">
            <img src={underline} alt="" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 mt-10">
              <div className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden">
                <img
                  src={Pic1}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                  <span className="font-barlow text-lg font-normal">
                    A/C Room
                  </span>
                </div>
              </div>
              <div className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden">
                <img
                  src={Pic2}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                  <span className="font-barlow text-lg font-normal">
                    Non A/C Room
                  </span>

                </div>
              </div>
              <div className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden">
                <img
                  src={Pic3}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                  <span className="font-barlow text-lg font-normal">
                    Dining Hall
                  </span>

                </div>
              </div>
              <div className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden">
                <img
                  src={Pic4}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                  <span className="font-barlow text-lg font-normal">
                    Playing Area
                  </span>

                </div>
              </div>
              <div className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden">
                <img
                  src={Pic5}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                  <span className="font-barlow text-lg font-normal">
                    Bunker Cot
                  </span>

                </div>
              </div>
              <div className="group min-h-[260px] relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full after:bg-gradient-to-t after:from-black/75 after:to-black/5 after:opacity-0 hover:after:opacity-100 after:transition after:duration-300 after:ease-in-out overflow-hidden">
                <img
                  src={Pic6}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="bg-lion text-white py-2 px-4 flex items-center justify-between absolute bottom-3 left-0 z-10 -translate-x-full group-hover:translate-x-0 transition duration-300 ease-in-out w-4/5">
                  <span className="font-barlow text-lg font-normal">
                    Library
                  </span>

                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 px-3 bg-banner-image bg-center bg-cover bg-fixed bg-no-repeat" id='amenities'>
          <div className="container max-w-[1200px] mx-auto">
            <h2 className="font-gilda font-normal text-3xl sm:text-[46px] tracking-[.04em] text-coyote text-center mb-3">
              Convenient amenities
            </h2>
            <div className="flex items-center justify-center">
            <img src={underline} alt="" />
            </div>
            <br></br>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((item, index) => (
                <div key={index} className="relative">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={item.image}
                    alt={item.content}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 text-white p-4">
                    <p className="text-center">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
        <footer>
          <div className="bg-nero py-16 px-3" id='footer'>
            <div className="grid max-w-[1200px] mx-auto gap-8 text-center md:grid-cols-2 md:text-start lg:grid-cols-footer">
              <div className="md:me-2 lg:me-3">
                <a
                  className="text-lion font-gilda font-normal text-2xl tracking-[.04em]"
                >
                  CEG<span className="text-white">Hostels</span>
                </a>
                <p className="text-white font-light font-barlow text-base mt-3 max-w-[480px] mx-auto md:ms-0">
                  Staying in hostels can be the biggest adventure of your travels.
                  Therefore some great memories can be made and relived through these
                  quotes about hostel life.
                </p>
              </div>
              <div>
                <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
                  our offered facilities
                </h4>
                <ul role="list" className='list-disc marker:text-orange-400'>
                  <li className="my-2">
                    <a className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Safe and secure hostels
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Healthy Food
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Hygienic Rooms
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Peaceful Environment
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
                  Accomodation Benefits
                </h4>
                <ul role="list" className='list-disc marker:text-orange-400'>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Convenient proximity to campus
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Regular social events
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Study areas and quiet zones
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white hover:text-white/50 transition duration-300 ease-in-out"
                    >
                      Access to essential amenities
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="inline-block font-gilda tracking-[.04em] text-lg text-white capitalize relative after:absolute after:content-[''] after:left-0 after:-bottom-0 after:h-[1px] after:w-full after:bg-coyote pb-1 mb-4">
                  contact
                </h4>
                <ul >
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white/50 transition duration-300 ease-in-out "
                    >
                      CEG Hostel Office,
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white/50 transition duration-300 ease-in-out"
                    >
                      College of Engineering Guindy,
                    </a>
                  </li>
                  <li className="my-2">
                    <a
                      className="capitalize font-barlow font-light text-base text-white/50 transition duration-300 ease-in-out"
                    >
                      Anna University, Chennai-25.
                    </a>
                  </li>
                  <li className="my-2">
                    <a href='tel:04422352257'
                      className="capitalize font-barlow font-light text-bas text-white/50 transition duration-300 ease-in-out"
                    >
                      Phone: 044-2235-2257
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="py-4 text-white font-normal font-barlow uppercase text-center tracking-widest bg-nero-dark">
            <p className="text-sm">© copyright 2023 by NPS Team</p>
          </div>
        </footer>
      </div >
    </Transitions >
  )
}

export default HomePage
