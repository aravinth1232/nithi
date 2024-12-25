import React, { useState } from 'react'

const Excel = () => {
    const [tableData, setTableData] = useState([]);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split("\n"); // Split content by rows
        const parsedData = rows.map((row) => row.split(",")); // Split each row by commas
        setTableData(parsedData);
        console.log(parsedData);
      };
  
      reader.readAsText(file); // Read the file as plain text
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Upload and Display Excel Data</h1>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        {tableData.length > 0 && (
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                {tableData[1].map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}

export default Excel