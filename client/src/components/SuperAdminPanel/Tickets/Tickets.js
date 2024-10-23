// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Tickets.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for the arrow icon

// // function Tickets() {
// //   const [tickets, setTickets] = useState([
// //     {
// //       id: 1,
// //       requester: "Vaishnavi",
// //       subject: "Bluetooth not working",
// //       engineer: "ABC1",
// //       status: "Open",
// //       time: "20 Aug 2024",
// //       priority: "High",
// //     },
// //     {
// //       id: 2,
// //       requester: "Parth",
// //       subject: "Shutdown Problem",
// //       engineer: "Unassigned",
// //       status: "Closed",
// //       time: "23 Aug 2024",
// //       priority: "Medium",
// //     },
// //     {
// //       id: 3,
// //       requester: "John",
// //       subject: "Display issue",
// //       engineer: "XYZ2",
// //       status: "Pending",
// //       time: "24 Aug 2024",
// //       priority: "Low",
// //     },
// //     {
// //       id: 4,
// //       requester: "Priya",
// //       subject: "Keyboard not working",
// //       engineer: "ABC2",
// //       status: "Open",
// //       time: "25 Aug 2024",
// //       priority: "High",
// //     },
// //     {
// //       id: 5,
// //       requester: "Amit",
// //       subject: "Wi-Fi connectivity issue",
// //       engineer: "XYZ3",
// //       status: "Pending",
// //       time: "26 Aug 2024",
// //       priority: "Medium",
// //     },
// //     {
// //       id: 6,
// //       requester: "Rohan",
// //       subject: "Battery drainage issue",
// //       engineer: "Unassigned",
// //       status: "Closed",
// //       time: "27 Aug 2024",
// //       priority: "Low",
// //     },
// //     {
// //       id: 7,
// //       requester: "Meera",
// //       subject: "Overheating issue",
// //       engineer: "ABC3",
// //       status: "Open",
// //       time: "28 Aug 2024",
// //       priority: "High",
// //     },
// //     {
// //       id: 8,
// //       requester: "Anita",
// //       subject: "Camera not working",
// //       engineer: "XYZ1",
// //       status: "Pending",
// //       time: "29 Aug 2024",
// //       priority: "Low",
// //     },
// //     {
// //       id: 9,
// //       requester: "Rahul",
// //       subject: "Audio issue",
// //       engineer: "ABC1",
// //       status: "Closed",
// //       time: "30 Aug 2024",
// //       priority: "Medium",
// //     },
// //     {
// //       id: 10,
// //       requester: "Karan",
// //       subject: "Touchscreen problem",
// //       engineer: "XYZ2",
// //       status: "Open",
// //       time: "1 Sept 2024",
// //       priority: "High",
// //     },

// //     // ...rest of the tickets
// //   ]);

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("");
// //   const [priorityFilter, setPriorityFilter] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalClass, setTotalClass] = useState("");
// //   const ticketsPerPage = 10;

// //   const navigate = useNavigate();

// //   // Filter tickets based on search query and selected filters
// //   const filteredTickets = tickets.filter((ticket) => {
// //     return (
// //       ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
// //       (statusFilter === "" || ticket.status === statusFilter) &&
// //       (priorityFilter === "" || ticket.priority === priorityFilter)
// //     );
// //   });

// //   // Pagination logic
// //   const indexOfLastTicket = currentPage * ticketsPerPage;
// //   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
// //   const currentTickets = filteredTickets.slice(
// //     indexOfFirstTicket,
// //     Math.min(indexOfLastTicket, filteredTickets.length)
// //   );

// //   const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

// //   const paginate = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //     const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
// //     if (pageNumber > totalPages) {
// //       setCurrentPage(totalPages);
// //     }
// //   };

// //   // Dynamic color and animation for total tickets
// //   useEffect(() => {
// //     const totalTickets = filteredTickets.length;

// //     if (totalTickets > 20) {
// //       setTotalClass("high");
// //     } else if (totalTickets > 10) {
// //       setTotalClass("medium");
// //     } else {
// //       setTotalClass("low");
// //     }

// //     const totalElement = document.querySelector(".total-tickets");
// //     if (totalElement) {
// //       totalElement.classList.add("pulse");
// //       setTimeout(() => {
// //         totalElement.classList.remove("pulse");
// //       }, 1000);
// //     }
// //   }, [filteredTickets.length]);

// //   // Handle routing to the general ticket details page
// //   const handleArrowClick = () => {
// //     navigate("/SuperAdminDashboard/ticket-detail");
// //   };

// //   return (
// //     <div className="tickets-container">
// //       <div className="header-area">{/* <h1>Tickets List</h1> */}</div>

// //       <div className="top-section">
// //         <button
// //           className="new-ticket"
// //           onClick={() => navigate("/SuperAdminDashboard/new-ticket")}
// //         >
// //           Create New Ticket
// //         </button>

// //         <div className="new-ticket-total-container">
// //           {/*         
// //           <div className={`total-tickets ${totalClass}`}>
// //             <span className="ticket-icon">🎟️</span>
// //             <h3>Total Tickets: {filteredTickets.length}</h3>
// //           </div> */}

// //           {/* Display total tickets */}
// //           <div className="total-tickets-trt">
// //             <div style={{ display: "flex", alignItems: "center" }}>
// //               <span className="ticket-icon-trt">🎟️</span>
// //               <h3>Total Tickets: {filteredTickets.length}</h3>
// //             </div>
// //             {/* <span className="ticket-count-trt">{filteredTickets.length}</span> */}
// //           </div>

          
// //         </div>
// //       </div>

// //       <div className="search-filter-section">
// //         <div className="search-bar">
// //           <input
// //             type="text"
// //             placeholder="Search by Subject"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //         </div>

// //         <div className="filters">
// //           <div className="filter-item">
// //             <select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //             >
// //               <option value="">All Status</option>
// //               <option value="Open">Open</option>
// //               <option value="Pending">Pending</option>
// //               <option value="Closed">Closed</option>
// //             </select>
// //           </div>

// //           <div className="filter-item">
// //             <select
// //               value={priorityFilter}
// //               onChange={(e) => setPriorityFilter(e.target.value)}
// //             >
// //               <option value="">All Priority</option>
// //               <option value="High">High</option>
// //               <option value="Medium">Medium</option>
// //               <option value="Low">Low</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="tickets-table-container">
// //         <table className="tickets-table">
// //           <thead>
// //             <tr>
// //               <th>Ticket ID</th>
// //               <th>Requester</th>
// //               <th>Subject</th>
// //               <th>Engineer</th>
// //               <th>Status</th>
// //               <th>Time</th>
// //               <th>Priority</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {currentTickets.map((ticket) => (
// //               <tr key={ticket.id}>
// //                 <td>{ticket.id}</td>
// //                 <td>{ticket.requester}</td>
// //                 <td>{ticket.subject}</td>
// //                 <td>{ticket.engineer}</td>
// //                 <td>
// //                   <select
// //                     value={ticket.status}
// //                     onChange={(e) =>
// //                       setTickets((prev) =>
// //                         prev.map((t) =>
// //                           t.id === ticket.id
// //                             ? { ...t, status: e.target.value }
// //                             : t
// //                         )
// //                       )
// //                     }
// //                   >
// //                     <option value="Open">Open</option>
// //                     <option value="Pending">Pending</option>
// //                     <option value="Closed">Closed</option>
// //                   </select>
// //                 </td>
// //                 <td>{ticket.time}</td>
// //                 <td>{ticket.priority}</td>
// //                 <td>
// //                   <i
// //                     className="fas fa-arrow-right"
// //                     onClick={handleArrowClick}
// //                     style={{ cursor: "pointer" }}
// //                   ></i>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       <div className="pagination">
// //         {Array.from({ length: totalPages }, (_, index) => (
// //           <button
// //             key={index + 1}
// //             onClick={() => paginate(index + 1)}
// //             className={currentPage === index + 1 ? "active" : ""}
// //           >
// //             {index + 1}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Tickets;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Tickets.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for the arrow icon

// function Tickets() {
//   const [tickets, setTickets] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [priorityFilter, setPriorityFilter] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalClass, setTotalClass] = useState('');
//   const ticketsPerPage = 10;

//   const navigate = useNavigate();

//   // Fetch tickets for all roles from the backend
//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         // Fetch tickets from the backend API
//         const response = await fetch('http://localhost:1760/allticketsbyrole', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // You may need to include authentication tokens here if required
//             // 'Authorization': `Bearer ${your_token}`
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch tickets');
//         }

//         const data = await response.json();

//         if (data.tickets) {
//           // Sort tickets by timeRaised in descending order (latest first)
//           const sortedTickets = data.tickets.sort((a, b) => {
//             const timeA = new Date(`${a.date} ${a.time}`).getTime();
//             const timeB = new Date(`${b.date} ${b.time}`).getTime();
//             return timeB - timeA; // Descending order for latest tickets first
//           });

//           setTickets(sortedTickets); // Set sorted tickets to state
//         } else {
//           console.error('No tickets found');
//         }
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//         alert("Failed to fetch tickets. Please try again later.");
//       }
//     };

//     fetchTickets();
//   }, []);

//   const filteredTickets = tickets.filter(ticket => {
//     return (
//       (ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || '') && // Add a check for ticket.subject
//       (statusFilter === '' || ticket.status === statusFilter) &&
//       (priorityFilter === '' || ticket.priority === priorityFilter)
//     );
//   });
  
//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));
//   const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
//     if (pageNumber > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   };

//   useEffect(() => {
//     const totalTickets = filteredTickets.length;

//     if (totalTickets > 20) {
//       setTotalClass('high');
//     } else if (totalTickets > 10) {
//       setTotalClass('medium');
//     } else {
//       setTotalClass('low');
//     }

//     const totalElement = document.querySelector('.total-tickets');
//     if (totalElement) {
//       totalElement.classList.add('pulse');
//       setTimeout(() => {
//         totalElement.classList.remove('pulse');
//       }, 1000);
//     }
//   }, [filteredTickets.length]);

//   const handleArrowClick = (ticketId) => {
//     navigate(`/SuperAdminDashboard/ticket-detail/${ticketId}`);
//   };

//   return (  
//     <div className="tickets-container">
//       <div className="header-area">
//         {/* <h1>Tickets List</h1> */}
//       </div>

//       <div className="top-section">
//         <div className="new-ticket-total-container">
//           <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
//             Create New Ticket
//           </button>
//         {/* Display total tickets */}
//            <div className="total-tickets-trt">
//              <div style={{ display: "flex", alignItems: "center" }}>
//                <span className="ticket-icon-trt">🎟️</span>
//                <h3>Total Tickets: {filteredTickets.length}</h3>
//              </div>
//              {/* <span className="ticket-count-trt">{filteredTickets.length}</span> */}
//         </div>
//         </div>
//       </div>

//       <div className="search-filter-section">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by Subject"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="filters">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="">All Status</option>
//             <option value="Open">Open</option>
//             <option value="Pending">Pending</option>
//             <option value="Closed">Closed</option>
//           </select>

//           <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
//             <option value="">All Priority</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </div>
//       </div>

//       <div className="tickets-table-container">
//         <table className="tickets-table">
//           <thead>
//             <tr>
//               <th>Ticket ID</th>
//               <th>Subject</th>
//               <th>Engineer</th> {/* Updated header to remove Requester */}
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentTickets.map((ticket) => (
//               <tr key={ticket.id}>
//                 <td>{ticket.id}</td>
//                 <td className="wrap-text">{ticket.subject}</td>
//                 <td className="wrap-text">{ticket.assignedTo || 'Unassigned'}</td> {/* Updated to show assignedTo */}
//                 <td>{ticket.status}</td>
//                 <td>{ticket.priority}</td>
//                 <td>{ticket.date}</td>
//                 <td>
//                   <button
//                     className="arrow-button"
//                     onClick={() => handleArrowClick(ticket.id)}
//                   >
//                     ➡️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array(totalPages)
//             .fill(0)
//             .map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => paginate(index + 1)}
//                 className={currentPage === index + 1 ? 'active' : ''}
//               >
//                 {index + 1}
//               </button>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Tickets;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tickets.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for the arrow icon
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../../../firebase/firebaseconfig'; // Import your Firebase configuration

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [role, setRole] = useState(''); // State to manage user role
  const ticketsPerPage = 10;
  const navigate = useNavigate();

  // Fetch tickets based on user role
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userRole = 'Admin'; // You can dynamically set this based on the logged-in user
        setRole(userRole);

        const ticketsRef = collection(db, 'tickets');
        let q;

        if (userRole === 'SuperAdmin') {
          // Fetch all tickets for SuperAdmin
          q = query(ticketsRef);
        } else if (userRole === 'Admin') {
          const userId = 'your-admin-user-id'; // You can get this dynamically, for example, from Auth
          // Fetch only tickets assigned to the specific Admin
          q = query(ticketsRef, where('assignedTo', '==', userId));
        }

        const querySnapshot = await getDocs(q);
        const fetchedTickets = [];
        querySnapshot.forEach((doc) => {
          fetchedTickets.push({ id: doc.id, ...doc.data() });
        });

        // Sort tickets by timeRaised in descending order
        const sortedTickets = fetchedTickets.sort((a, b) => {
          const timeA = new Date(`${a.date} ${a.time}`).getTime();
          const timeB = new Date(`${b.date} ${b.time}`).getTime();
          return timeB - timeA;
        });

        setTickets(sortedTickets); // Set sorted tickets to state
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Failed to fetch tickets. Please try again later.');
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || '') &&
      (statusFilter === '' || ticket.status === statusFilter) &&
      (priorityFilter === '' || ticket.priority === priorityFilter)
    );
  });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, Math.min(indexOfLastTicket, filteredTickets.length));
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleArrowClick = (ticketId) => {
    navigate(`/SuperAdminDashboard/ticket-detail/${ticketId}`);
  };

  return (
    <div className="tickets-container">
      <div className="header-area"></div>
      <div className="top-section">
        <div className="new-ticket-total-container">
          <button className="new-ticket" onClick={() => navigate('/SuperAdminDashboard/new-ticket')}>
            Create New Ticket
          </button>
          <div className="total-tickets-trt">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="ticket-icon-trt">🎟️</span>
              <h3>Total Tickets: {filteredTickets.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Subject"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
          </select>

          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="tickets-table-container">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Engineer</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td className="wrap-text">{ticket.subject}</td>
                <td className="wrap-text">{ticket.assignedTo || 'Unassigned'}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.date}</td>
                <td>
                  <button className="arrow-button" onClick={() => handleArrowClick(ticket.id)}>
                    ➡️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Tickets;