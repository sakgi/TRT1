// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import './AddEngineer.css';
// import { useNavigate } from 'react-router-dom';

// function AddEngineer() {
//   const [rows, setRows] = useState([{ email: '' }]); // Removed name field
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
//     setRows([...rows, { email: '' }]); // Removed name field
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

//   const handleSubmit = () => {
//     for (let row of rows) {
//       if (!row.email) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Validation Error',
//           text: 'Please enter an email address!',
//           confirmButtonText: 'OK'
//         });
//         return;
//       }
//       if (!validateEmail(row.email)) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Validation Error',
//           text: 'Please enter a valid email address!',
//           confirmButtonText: 'OK'
//         });
//         return;
//       }
//     }

//     Swal.fire({
//       icon: 'success',
//       title: 'Successfully Added Engineer!',
//       text: 'Your engineer has been added successfully.',
//       confirmButtonText: 'OK'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(-1);
//       }
//     });
//   };

//   return (
//     <div className="add-engineer-container fade-in">
//       <div className="add-engineer-header">
//         <h2 className="heading">Add Engineer</h2>
//       </div>
//       <div className="table">
//         <div className="table-row table-header">
//           <div className="table-cell">Email ID</div> {/* Removed "Name" */}
//           {/* <div className="table-cell">Action</div> */}
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
      const response = await fetch('/api/add-engineer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails: rows.map(row => row.email) }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Added Engineer!',
          text: data.message,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(-1);
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding engineers.',
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
