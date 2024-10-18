// import React, { useState } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import './SuperAdminEngineerManag.css';
// // import logo from '../assets/logo.png';

// function Engineering() {
//   const [engineers, setEngineers] = useState([
//     { id: 1, Ticketid: 1, name: 'John Doe', roll: 'ENG123', status: 'Active' },
//     { id: 2, Ticketid: 2, name: 'Jane Smith', roll: 'ENG456', status: 'Inactive' },
//     { id: 3, Ticketid: 3, name: 'Emily Johnson', roll: 'ENG789', status: 'Active' },
//   ]);
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleAddEngineerClick = () => {
//     navigate('/SuperAdminDashboard/add-engineer');
//   };

//   const handleDeleteClick = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this engineer!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedEngineers = engineers.filter((engineer) => engineer.id !== id);
//         setEngineers(updatedEngineers);
//         Swal.fire('Deleted!', 'The engineer has been deleted.', 'success');
//       }
//     });
//   };

//   const filteredEngineers = engineers.filter((engineer) =>
//     engineer.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="engineering-container">
//      <div className="header-area">
//       <h1>
//       {/* <span className="header-text"> Engineer Management </span> */}
 
 
//   <span style={{flexGrow: 1}}></span>
//   {/* <img src={logo} alt="Logo" className="header-logo" /> */}
// </h1>
//       </div>

//       <div className="top-section">
//         <button className="add-engineer" onClick={handleAddEngineerClick}>
//           Add Engineer
//         </button>
        
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by Name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="search-icon">
//             <i className="fa fa-search"></i>
//           </button>
//         </div>
//       </div>

//       <div className="table-container">
//         <table className="engineering-table">
//           <thead>
//             <tr>
//               <th>Ticket ID</th>
//               <th>Name</th>
//               <th>Roll</th>
//               <th>Status</th>
//               <th>Activity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEngineers.length > 0 ? (
//               filteredEngineers.map((engineer) => (
//                 <tr key={engineer.id}>
//                   <td>{engineer.Ticketid}</td>
//                   <td>{engineer.name}</td>
//                   <td>{engineer.roll}</td>
//                   <td>{engineer.status}</td>
//                   <td>
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDeleteClick(engineer.id)}
//                     >
//                       Delete Account
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No engineers found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* This Outlet renders only if the path is not for add-engineer */}
//       {location.pathname !== '/admin-tickets/add-engineer' && <Outlet />}
//     </div>
//   );
// }

// export default Engineering;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { db } from 'C:/Users/tatko/Downloads/ticket-raising-tool-front/client/src/firebase/firebaseconfig.js'; // Import Firestore instance
// import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore methods
// import './SuperAdminEngineerManag.css';

// function Engineering() {
//   const [engineers, setEngineers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Fetch engineers with role "Admin" from Firebase
//   useEffect(() => {
//     const fetchEngineers = async () => {
//       try {
//         const q = query(collection(db, 'users'), where('role', '==', 'Admin'));
//         const querySnapshot = await getDocs(q);
//         const engineerList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setEngineers(engineerList);
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to fetch engineers from Firebase.',
//           confirmButtonText: 'OK',
//         });
//       }
//     };

//     fetchEngineers();
//   }, []);

//   const handleAddEngineerClick = () => {
//     navigate('/SuperAdminDashboard/add-engineer');
//   };

//   const handleDeleteClick = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this engineer!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedEngineers = engineers.filter((engineer) => engineer.id !== id);
//         setEngineers(updatedEngineers);
//         Swal.fire('Deleted!', 'The engineer has been deleted.', 'success');
//       }
//     });
//   };

//   const filteredEngineers = engineers.filter((engineer) =>
//     engineer.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="engineering-container">
//       <div className="header-area">
//         <h1>
//           <span style={{ flexGrow: 1 }}></span>
//         </h1>
//       </div>

//       <div className="top-section">
//         <button className="add-engineer" onClick={handleAddEngineerClick}>
//           Add Engineer
//         </button>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by Name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="search-icon">
//             <i className="fa fa-search"></i>
//           </button>
//         </div>
//       </div>

//       <div className="table-container">
//         <table className="engineering-table">
//           <thead>
//             <tr>
//               <th>Ticket ID</th>
//               <th>Name</th>
//               <th>Roll</th>
//               <th>Status</th>
//               <th>Activity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEngineers.length > 0 ? (
//               filteredEngineers.map((engineer) => (
//                 <tr key={engineer.id}>
//                   <td>{engineer.Ticketid || 'N/A'}</td>
//                   <td>{engineer.name || 'N/A'}</td>
//                   <td>{engineer.roll || 'N/A'}</td>
//                   <td>{engineer.status || 'N/A'}</td>
//                   <td>
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDeleteClick(engineer.id)}
//                     >
//                       Delete Account
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No engineers found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* This Outlet renders only if the path is not for add-engineer */}
//       {location.pathname !== '/admin-tickets/add-engineer' && <Outlet />}
//     </div>
//   );
// }

// export default Engineering;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { db } from 'C:/Users/tatko/Downloads/ticket-raising-tool-front/client/src/firebase/firebaseconfig.js'; // Firebase config import
// import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore imports
// import './SuperAdminEngineerManag.css';

// function Engineering() {
//   const [engineers, setEngineers] = useState([]);
//   const [loading, setLoading] = useState(true);  // Loading state
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Fetch engineers with role "Admin" from Firebase
//   useEffect(() => {
//     const fetchEngineers = async () => {
//       try {
//         setLoading(true); // Start loading
//         const q = query(collection(db, 'users'), where('role', '==', 'Admin'));
//         const querySnapshot = await getDocs(q);
//         const engineerList = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             fullName: `${data.First_Name} ${data.Last_Name}`, // Merge First and Last Name
//             Circle: data.Circle || 'N/A',
//             Email: data.Email || 'N/A',
//             Employee_ID: data.Employee_ID || 'N/A',
//             Mobile_Number: data.Mobile_Number || 'N/A',
//             Organization: data.Organization || 'N/A',
//             role: data.role || 'N/A',
//           };
//         });
//         setEngineers(engineerList);  // Update state with the list of engineers
//         setLoading(false);  // End loading
//       } catch (error) {
//         setLoading(false);  // End loading in case of error
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: `Failed to fetch engineers from Firebase: ${error.message}`,  // Display error message
//           confirmButtonText: 'OK',
//         });
//       }
//     };

//     fetchEngineers();
//   }, []);

//   // Handle add engineer button click
//   const handleAddEngineerClick = () => {
//     navigate('/SuperAdminDashboard/add-engineer');
//   };

//   // Handle delete engineer action
//   const handleDeleteClick = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will not be able to recover this engineer!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedEngineers = engineers.filter((engineer) => engineer.id !== id);
//         setEngineers(updatedEngineers);
//         Swal.fire('Deleted!', 'The engineer has been deleted.', 'success');
//       }
//     });
//   };

//   // Filter engineers based on the search query
//   const filteredEngineers = engineers.filter((engineer) =>
//     engineer.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="engineering-container">
//       <div className="header-area">
//         <h1>Engineer Management</h1>
//       </div>

//       <div className="top-section">
//         <button className="add-engineer" onClick={handleAddEngineerClick}>
//           Add Engineer
//         </button>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by Name"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="search-icon">
//             <i className="fa fa-search"></i>
//           </button>
//         </div>
//       </div>

//       <div className="table-container">
//         {loading ? (
//           <p>Loading engineers...</p>
//         ) : (
//           <table className="engineering-table">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Full Name</th>
//                 <th>Email</th>
//                 <th>Circle</th>
//                 <th>Mobile Number</th>
//                 <th>Organization</th>
//                 <th>Role</th>
//                 <th>Activity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEngineers.length > 0 ? (
//                 filteredEngineers.map((engineer) => (
//                   <tr key={engineer.id}>
//                     <td>{engineer.Employee_ID || 'N/A'}</td>
//                     <td>{engineer.fullName || 'N/A'}</td>
//                     <td>{engineer.Email || 'N/A'}</td>
//                     <td>{engineer.Circle || 'N/A'}</td>
//                     <td>{engineer.Mobile_Number || 'N/A'}</td>
//                     <td>{engineer.Organization || 'N/A'}</td>
//                     <td>{engineer.role || 'N/A'}</td>
//                     <td>
//                       <button
//                         className="delete-button"
//                         onClick={() => handleDeleteClick(engineer.id)}
//                       >
//                         Delete Account
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8">No engineers found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* This Outlet renders only if the path is not for add-engineer */}
//       {location.pathname !== '/admin-tickets/add-engineer' && <Outlet />}
//     </div>
//   );
// }

// export default Engineering;


import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import './SuperAdminEngineerManag.css'; // Your CSS file

function Engineering() {
  const [engineers, setEngineers] = useState([]);  // State for engineers
  const [loading, setLoading] = useState(true);  // Loading state
  const [searchQuery, setSearchQuery] = useState('');  // Search query state
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch engineers from Node.js backend API
  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch('/api/engineers');  // API endpoint to your Node.js backend
        const data = await response.json();
        
        setEngineers(data);  // Update engineers state with the fetched data
        setLoading(false);  // Stop loading
      } catch (error) {
        setLoading(false);  // Stop loading in case of an error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to fetch engineers: ${error.message}`,  // Display error message
          confirmButtonText: 'OK',
        });
      }
    };

    fetchEngineers();
  }, []);

  // Handle add engineer button click
  const handleAddEngineerClick = () => {
    navigate('/SuperAdminDashboard/add-engineer');  // Navigate to add engineer page
  };

  // Handle delete engineer action
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this engineer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedEngineers = engineers.filter((engineer) => engineer.id !== id);
        setEngineers(updatedEngineers);
        Swal.fire('Deleted!', 'The engineer has been deleted.', 'success');
      }
    });
  };

  // Filter engineers based on the search query (case-insensitive)
  const filteredEngineers = engineers.filter((engineer) =>
    engineer.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="engineering-container">
      <div className="header-area">
        <h1>Engineer Management</h1>
      </div>

      <div className="top-section">
        <button className="add-engineer" onClick={handleAddEngineerClick}>
          Add Engineer
        </button>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-icon">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading engineers...</p>
        ) : (
          <table className="engineering-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Circle</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Organization</th>
                <th>Role</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredEngineers.length > 0 ? (
                filteredEngineers.map((engineer) => (
                  <tr key={engineer.id}>
                    <td>{engineer.Employee_ID || 'N/A'}</td>
                    <td>{engineer.fullName || 'N/A'}</td>
                    <td>{engineer.Circle || 'N/A'}</td>
                    <td>{engineer.Mobile_Number || 'N/A'}</td>
                    <td>{engineer.Email || 'N/A'}</td>
                    <td>{engineer.Organization || 'N/A'}</td>
                    <td>{engineer.role || 'N/A'}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteClick(engineer.id)}
                      >
                        Delete Account
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No engineers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* This Outlet renders only if the path is not for add-engineer */}
      {location.pathname !== '/admin-tickets/add-engineer' && <Outlet />}
    </div>
  );
}

export default Engineering;
