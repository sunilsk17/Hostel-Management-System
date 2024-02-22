import React from 'react';
import {AiOutlineLink} from 'react-icons/ai'
const AnnouncementTab = () => {
    return (
        <div className=" p-4">
            <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
                <div className="bg-white p-6">
                    <h2 className="text-xl font-bold mb-4" style={{ borderBottom: "2px solid gray" }}>Announcements</h2>
                    <ul className="space-y-4">
                        <li>
                            <p className="text-gray-800" style={{ borderBottom: "1px dotted gray", padding: "5px" }}>
                                Circular for UG & PG Even semester (2022-2023)<br></br>
                                Mar 27th 2023<br></br><br></br>
                                <a className='text-blue-500 underline flex justify-start items-center'><AiOutlineLink /> UG & PG Even Semster.pdf</a>
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-800" style={{ borderBottom: "1px dotted gray", padding: "5px" }}>
                                Circular for UG & PG Odd semester (2022-2023)<br></br>
                                Dec 18th 2022<br></br><br></br>
                                <a className='text-blue-500 underline flex justify-start items-center'><AiOutlineLink /> UG & PG Even Semster.pdf</a>
                            </p>
                        </li>
                        <li>
                            <p className="text-gray-800" style={{ borderBottom: "1px dotted gray", padding: "5px" }}>
                                HOSTEL RE-ADMISSION FOR M.Sc (Int.) 5 Years & MBA (IV, VI, VIII & X SEMSETER)PHD SCHOLARS <br></br>
                                Aug 10th 2022<br></br><br></br>
                                <a className='text-blue-500 underline flex justify-start items-center'><AiOutlineLink /> UG & PG Even Semster.pdf</a>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementTab;
