import React, { useState } from 'react';

const Report = () => {
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(reportData);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Report an Environmental Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={reportData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={reportData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={reportData.location}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white transition bg-green-600 rounded-md hover:bg-green-700"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;