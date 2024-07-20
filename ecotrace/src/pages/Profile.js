import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Vaishnavi',
    email: 'vaishnavi.kale3011@gmail.com',
    bio: 'Environmental enthusiast and community activist.',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Your Profile</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{profileData.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{profileData.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{profileData.bio}</p>
            )}
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 text-white transition bg-green-600 rounded-md hover:bg-green-700"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;