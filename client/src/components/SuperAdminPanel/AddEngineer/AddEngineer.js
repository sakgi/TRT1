// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import './AddEngineer.css';
// import { useNavigate } from 'react-router-dom';

// function AddEngineer() {
//   const [rows, setRows] = useState([{ email: '' }]);
//   const navigate = useNavigate();

//   const hideNavigationBar = () => {
//     const navBar = document.getElementById('navbar');
//     if (navBar) {
//       navBar.style.display = 'none';
//     }
//   };

//   const showNavigationBar = () => {
//     const navBar = document.getElementById('navbar');
//     if (navBar) {
//       navBar.style.display = 'block';
//     }
//   };

//   useEffect(() => {
//     hideNavigationBar();
//     return () => showNavigationBar();
//   }, []);

//   const handleAddRow = () => {
//     setRows([...rows, { email: '' }]);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index][field] = value;
//     setRows(updatedRows);
//   };

//   const handleRemoveRow = (index) => {
//     const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
//     setRows(updatedRows);
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const handleSubmit = async () => {
//     for (let row of rows) {
//       if (!row.email) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Validation Error',
//           text: 'Please enter an email address!',
//           confirmButtonText: 'OK',
//         });
//         return;
//       }
//       if (!validateEmail(row.email)) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Validation Error',
//           text: 'Please enter a valid email address!',
//           confirmButtonText: 'OK',
//         });
//         return;
//       }
//     }

//     try {
//       const response = await fetch('/api/add-engineer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ emails: rows.map(row => row.email) }),
//       });

//       const data = await response.json();
//       if (response.status === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Successfully Added Engineer!',
//           text: data.message,
//           confirmButtonText: 'OK',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             navigate(-1);
//           }
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: data.message,
//           confirmButtonText: 'OK',
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding engineers.',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   return (
//     <div className="add-engineer-container fade-in">
//       <div className="add-engineer-header">
//         <h2 className="heading">Add Engineer</h2>
//       </div>
//       <div className="table">
//         <div className="table-row table-header">
//           <div className="table-cell">Email ID</div>
//         </div>
//         {rows.map((row, index) => (
//           <div className="table-row fade-in" key={index}>
//             <div className="table-cell">
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={row.email}
//                 className="input-field"
//                 onChange={(e) => handleInputChange(index, 'email', e.target.value)}
//               />
//             </div>
//             <div className="table-cell">
//               <i
//                 className="fas fa-times-circle remove-icon"
//                 onClick={() => handleRemoveRow(index)}
//                 style={{ cursor: 'pointer', color: 'red' }}
//                 title="Remove"
//               ></i>
//             </div>
//           </div>
//         ))}
//         <div className="add-more-container">
//           <button className="add-more-button bounce" onClick={handleAddRow}>
//             + Add More
//           </button>
//         </div>
//       </div>
//       <div className="submit-container">
//         <button className="add-engineer-button" onClick={handleSubmit}>
//           Add Engineer
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddEngineer;


import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './AddEngineer.css';
import { useNavigate } from 'react-router-dom';

function AddEngineer() {
  const [rows, setRows] = useState([{ email: '' }]);
  const navigate = useNavigate();

  const hideNavigationBar = () => {
    const navBar = document.getElementById('navbar');
    if (navBar) {
      navBar.style.display = 'none';
    }
  };

  const showNavigationBar = () => {
    const navBar = document.getElementById('navbar');
    if (navBar) {
      navBar.style.display = 'block';
    }
  };

  useEffect(() => {
    hideNavigationBar();
    return () => showNavigationBar();
  }, []);

  const handleAddRow = () => {
    setRows([...rows, { email: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    // Get the JWT token from local storage (or wherever you store it after login)
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'No token found. Please log in again.',
        confirmButtonText: 'OK',
      });
      return;
    }

    for (let row of rows) {
      if (!row.email) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter an email address!',
          confirmButtonText: 'OK',
        });
        return;
      }
      if (!validateEmail(row.email)) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please enter a valid email address!',
          confirmButtonText: 'OK',
        });
        return;
      }
    }

    try {
      for (let row of rows) {
        const response = await fetch('http://localhost:1760/admin/update-role', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the token in the Authorization header
          },
          body: JSON.stringify({ email: row.email }),
        });

        const data = await response.json();
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Updated User Role!',
            text: data.message,
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message,
            confirmButtonText: 'OK',
          });
        }
      }
      
      navigate(-1); // Navigate back after completing the updates
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating user roles.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="add-engineer-container fade-in">
      <div className="add-engineer-header">
        <h2 className="heading">Add Engineer</h2>
      </div>
      <div className="table">
        <div className="table-row table-header">
          <div className="table-cell">Email ID</div>
        </div>
        {rows.map((row, index) => (
          <div className="table-row fade-in" key={index}>
            <div className="table-cell">
              <input
                type="email"
                placeholder="Enter Email"
                value={row.email}
                className="input-field"
                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
              />
            </div>
            <div className="table-cell">
              <i
                className="fas fa-times-circle remove-icon"
                onClick={() => handleRemoveRow(index)}
                style={{ cursor: 'pointer', color: 'red' }}
                title="Remove"
              ></i>
            </div>
          </div>
        ))}
        <div className="add-more-container">
          <button className="add-more-button bounce" onClick={handleAddRow}>
            + Add More
          </button>
        </div>
      </div>
      <div className="submit-container">
        <button className="add-engineer-button" onClick={handleSubmit}>
          Add Engineer
        </button>
      </div>
    </div>
  );
}

export default AddEngineer;
