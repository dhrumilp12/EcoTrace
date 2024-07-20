import React, { useState, useEffect } from 'react';

const Track = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // will fetch this from backend 
    //now just added static data
    const mockIssues = [
      {
        id: 1,
        title: 'Pollution in River',
        description: 'There is significant pollution in the river near the town.',
        location: 'Riverbank, Townsville',
        status: 'In Progress',
      },
      {
        id: 2,
        title: 'Illegal Dumping',
        description: 'Illegal dumping of waste in the forest area.',
        location: 'Forest Area, Greenfield',
        status: 'Reported',
      },
      {
        id: 3,
        title: 'Deforestation',
        description: 'Unauthorized deforestation observed in the local park.',
        location: 'Local Park, Springfield',
        status: 'Resolved',
      },
    ];

    setIssues(mockIssues);
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Track Environmental Issues</h2>
        {issues.length > 0 ? (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="p-4 bg-gray-100 rounded-md shadow">
                <h3 className="mb-2 text-xl font-semibold">{issue.title}</h3>
                <p className="mb-2 text-gray-700">{issue.description}</p>
                <p className="mb-2 text-gray-500">Location: {issue.location}</p>
                <p className={`font-semibold ${issue.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                  Status: {issue.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No issues reported yet.</p>
        )}
      </div>
    </div>
  );
};

export default Track;