// // App.js
// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { TicketProvider } from './TicketContext'; // Adjust the path as necessary
// import TicketForm from '../TicketCreation/TicketForm';
// import TicketsTable from '../TicketsTable/TicketsTable';

// function App() {
//   return (
//     <TicketProvider>
//       <Router>
//         {/* Your Routes here */}
//         <TicketForm />
//         <TicketsTable />
//       </Router>
//     </TicketProvider>
//   );
// }

// export default App;
// TicketProvider.js (this is the root provider)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TicketProvider } from './TicketContext'; // Adjust path as necessary
import TicketForm from '../TicketCreation/TicketForm'; // Adjust path as necessary
import TicketsTable from '../TicketsTable/TicketsTable'; // Adjust path as necessary

function App() {
  return (
    <TicketProvider>
      <Router>
        <Routes>
          {/* Define your routes */}
          <Route path="/user-dashboard/ticket-form" element={<TicketForm />} />
          <Route path="/user-dashboard/mytickets" element={<TicketsTable />} />
        </Routes>
      </Router>
    </TicketProvider>
  );
}

export default App;
