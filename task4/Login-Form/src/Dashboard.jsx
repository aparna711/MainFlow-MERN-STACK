// import React, { useState, useEffect } from 'react';
// function Dashboard({ setView }) {
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:4000/api/me', {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setProfile(data.user))
//       .catch(() => setView('login'));
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-3">Dashboard</h2>
//       {profile && (
//         <div>
//           <p>Name: {profile.name}</p>
//           <p>Email: {profile.email}</p>
//         </div>
//       )}
//       <button className="mt-4 bg-gray-200 px-4 py-2 rounded" onClick={() => { localStorage.removeItem('token'); setView('login'); }}>Logout</button>
//     </div>
//   );
// }
// export default Dashboard;


import React, { useState, useEffect } from 'react';

export default function Dashboard({ setView }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data.user))
      .catch(() => setView('login'));
  }, [setView]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Dashboard</h2>
      {profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      )}
      <button
        className="mt-4 bg-gray-200 px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem('token');
          setView('login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
