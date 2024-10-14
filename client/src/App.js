// import Routes from './Routes';

// function App() {
 
//   return (
//     <div className="app">
//       <Routes />
//       </div>
  
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { TicketProvider } from './components/UserPanel/addTicket/TicketContext'; // Adjust based on your structure
// import TicketForm from './components/UserPanel/TicketCreation/TicketForm'; // Adjust path
// import TicketsTable from './components/UserPanel/TicketsTable/TicketsTable'; // Adjust path


// function App() {
//   return (
//     <TicketProvider>
//       <Router>
//         <Routes>
//           {/* Define your routes */}
//           <Route path="/user-dashboard/ticket-form" element={<TicketForm />} />
//           <Route path="/user-dashboard/mytickets" element={<TicketsTable />} />
//         </Routes>
//       </Router>
//     </TicketProvider>
//   );
// }

// export default App;

// import { TicketProvider } from './components/UserPanel/addTicket/TicketContext';
// import Routes from './Routes';
// function App() {
  
//   return (
//      <div className="app">
//      <TicketProvider>
//       <Routes />
//      </TicketProvider>
//       </div>
 
  
//   );
// }

// export default App;

import React, { useState } from 'react';
// import AppRoutes from './AppRoutes';
import Routes from './Routes';
const App = () => {
  const [userRole, setUserRole] = useState('SuperAdmin'); // Change to 'Admin' to test Admin role

  return <Routes userRole={userRole} />;
};

export default App;

