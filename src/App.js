// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import ForgotPassword from './pages/ForgotPassword';
// import ChangePassword from './pages/ChangePassword';
// import AdminTickets from './pages/AdminTickets';
// import Tickets from './pages/Tickets';
// import NewTicket from './pages/NewTicket';
// import Engineering from './pages/Engineering';
// import AddEngineer from './pages/AddEngineer';
// import ReportGeneration from './pages/ReportGeneration';
// import Approval from './pages/Approval';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login and password routes */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/change-password" element={<ChangePassword />} />

//         {/* Admin-related routes */}
//         <Route path="/admin-tickets" element={<AdminTickets />}>

//         <Route path="tickets" element={<Tickets />} />
//         <Route path="new-ticket" element={<NewTicket />} />
//           {/* <Route path="tickets" element={<Tickets />}>
            
//           </Route>
//           <Route path="new-ticket" element={<NewTicket />} /> */}
//           <Route path="engineering" element={<Engineering />} >
//           <Route path="add-engineer" element={<AddEngineer />} /> 
//           </Route>
//           <Route path="report-generation" element={<ReportGeneration />} />
//           <Route path="approval" element={<Approval />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import ForgotPassword from './pages/ForgotPassword';
// import ChangePassword from './pages/ChangePassword';
// import AdminTickets from './pages/AdminTickets';
// import Tickets from './pages/Tickets';
// import NewTicket from './pages/NewTicket';
// import Engineering from './pages/Engineering';
// import AddEngineer from './pages/AddEngineer';
// import ReportGeneration from './pages/ReportGeneration';
// import Approval from './pages/Approval';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Login and password routes */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/change-password" element={<ChangePassword />} />

//         {/* Admin-related routes */}
//         <Route path="/admin-tickets" element={<AdminTickets />}>
//           <Route path="tickets" element={<Tickets />} />
//           <Route path="new-ticket" element={<NewTicket />} /> {/* No Navigation bar here */}
//           <Route path="engineering" element={<Engineering />}>
//             <Route path="add-engineer" element={<AddEngineer />} />
//           </Route>
//           <Route path="report-generation" element={<ReportGeneration />} />
//           <Route path="approval" element={<Approval />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import AdminTickets from './pages/AdminTickets';
import Tickets from './pages/Tickets';
import NewTicket from './pages/NewTicket';
import Engineering from './pages/Engineering';
import AddEngineer from './pages/AddEngineer';
import ReportGeneration from './pages/ReportGeneration';
import Approval from './pages/Approval';
import TicketDetail from './pages/TicketDetails';
import ViewTicketDetails from './pages/ViewTicketDetails';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and password routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Admin-related routes with Outlet for nested routes */}
        <Route path="/admin-tickets" element={<AdminTickets />}>
          {/* All these will be nested under /admin-tickets */}
          <Route path="tickets" element={<Tickets />} />
          <Route path="new-ticket" element={<NewTicket />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="add-engineer" element={<AddEngineer />} />
          <Route path="report-generation" element={<ReportGeneration />} />
          <Route path="approval" element={<Approval />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Individual ticket detail routes */}
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/tickets/view/:id" element={<ViewTicketDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
