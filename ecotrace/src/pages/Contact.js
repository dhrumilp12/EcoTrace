import React, { useState } from 'react';

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactData);
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
        <p className="mb-6 text-gray-700">
          If you have any questions, suggestions, or feedback, please feel free to reach out to us. We value your input and will get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              value={contactData.message}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white transition bg-green-600 rounded-md hover:bg-green-700"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;