import React from 'react';

const DashBoard = ({ headers, data }) => {
  return (
    <div className="flex flex-col col-span-3 p-8 min-w-full sm:w-1/2 lg:w-1/2 xl:w-1/3 shadow-lg bg-gray-50 rounded-lg mb-10 mx-3" >
      {headers.map((header, index) => (
        <div key={index} className="flex items-center flex-row  justify-between mb-4 mr-6">
          <div className="font-semibold text-gray-800 px-6">{header.label} :</div>
          <div className="font-normal text-gray-600 align uppercase">{header.value(data)}</div>
        </div>
      ))}
    </div>
  );
};

export default DashBoard;