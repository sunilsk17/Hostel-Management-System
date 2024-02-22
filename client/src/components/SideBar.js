import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { IconContext } from 'react-icons/lib';

const SideBar = ({ user, links }) => {
  const [open, setOpen] = useState(false);
  const renderedItems = links.map((link, i) => {
    return (
      <Link to={link.path} key={i} className="mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md">
        <IconContext.Provider value={{ color: 'white' }}>
          <div>{React.createElement(link.icon, { size: "20",color:'white' })}</div>
        </IconContext.Provider>
        <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
          }`}
        >
          {link.label}
        </h2>
        <h2
          className={`${open && "hidden"
            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
        >
          {link.label}
        </h2>
      </Link>)
  })

  return (
    <section className="flex gap-6 min-h-full">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between">
          {open && <div className='font-bold p-1 uppercase ml-2 text-gray-500'>{user}</div>}
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {renderedItems}</div>
      </div>
    </section>
  )
}

export default SideBar
