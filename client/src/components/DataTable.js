import React from 'react';

const DataTable = ({ headers, generateData }) => {
  return (
    <table className="min-w-full bg-gray-300 border border-gray-300">
      <thead>
        <tr>
            <th className="py-2 px-4 border-b border-gray-100 font-semibold text-left text-white bg-blue-500">S.No</th>
          {headers.map((header, index) => (
            <th
              key={index}
              className="py-2 px-4 border-b border-gray-100 font-semibold text-left text-white bg-blue-500"
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {generateData.map((data, rowIndex) => (
          <tr key={rowIndex}>
            <td
                key={rowIndex}
                className="py-2 px-4 border-b border-gray-300 bg-white"
              >
                {rowIndex+1}
              </td>
            {headers.map((header, colIndex) => (
              <td
                key={colIndex}
                className="py-2 px-4 border-b border-gray-300 bg-white"
              >
                {header.value(data)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
