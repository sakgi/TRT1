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



import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db } from 'C:/Users/tatko/Downloads/ticket-raising-tool-front/client/src/firebase/firebaseconfig.js'; // Firebase config import
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Firestore imports
import './SuperAdminEngineerManag.css';

function Engineering() {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch engineers with role "Admin" from Firebase
  useEffect(() => {
    // const fetchEngineers = async () => {
    //   try {
    //     setLoading(true);
    //     const q = query(collection(db, 'users'), where('role', '==', 'Admin'));
    //     const querySnapshot = await getDocs(q);
    //     const engineerList = querySnapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       return {
    //         id: doc.id,
    //         fullName: `${data.First_Name} ${data.Last_Name}`,
    //         circle: data.circle || 'N/A',
    //         email: data.email || 'N/A',
    //         employeeId: data.employeeId || 'N/A',
    //         phoneNumber: data.phoneNumber || 'N/A',
    //         organization: data.organization || 'N/A',
    //         role: data.role || 'N/A',
    //       };
    //     });
    //     setEngineers(engineerList);
    //     setLoading(false);
    //   } catch (error) {
    //     setLoading(false);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error',
    //       text: `Failed to fetch engineers from Firebase: ${error.message}`,
    //       confirmButtonText: 'OK',
    //     });
    //   }
    // };

    const fetchEngineers = async () => {
  try {
    setLoading(true);
    const q = query(collection(db, 'users'), where('role', '==', 'Admin'));
    const querySnapshot = await getDocs(q);
    const engineerList = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName || 'N/A',       // Use fullName field
        circle: data.circle || 'N/A',           // Use circle field
        email: data.email || 'N/A',             // Use email field
        employeeId: data.employeeId || 'N/A',   // Use employeeId field
        phoneNumber: data.phoneNumber || 'N/A', // Use phoneNumber field
        organization: data.organization || 'N/A', // Use organization field
        role: data.role || 'N/A',               // Use role field
      };
    });
    setEngineers(engineerList);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Failed to fetch engineers from Firebase: ${error.message}`,
      confirmButtonText: 'OK',
    });
  }
};


    fetchEngineers();
  }, []);

  // Handle add engineer button click
  const handleAddEngineerClick = () => {
    navigate('/SuperAdminDashboard/add-engineer');
  };

  // Handle delete engineer action
  const handleDeleteClick = async (id) => {
    const engineerRef = doc(db, 'users', id); // Reference to the engineer document

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this engineer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(engineerRef); // Delete the engineer from Firestore
          const updatedEngineers = engineers.filter((engineer) => engineer.id !== id);
          setEngineers(updatedEngineers); // Update the local state
          Swal.fire('Deleted!', 'The engineer has been deleted.', 'success');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to delete engineer: ${error.message}`,
          });
        }
      }
    });
  };

  // Filter engineers based on the search query
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
                <th>Full Name</th>
                <th>Email</th>
                <th>Circle</th>
                <th>Mobile Number</th>
                <th>Organization</th>
                <th>Role</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredEngineers.length > 0 ? (
                filteredEngineers.map((engineer) => (
                  <tr key={engineer.id}>
                    <td>{engineer.employeeId || 'N/A'}</td>
                    <td>{engineer.fullName || 'N/A'}</td>
                    <td>{engineer.email || 'N/A'}</td>
                    <td>{engineer.circle || 'N/A'}</td>
                    <td>{engineer.phoneNumber || 'N/A'}</td>
                    <td>{engineer.organization || 'N/A'}</td>
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

