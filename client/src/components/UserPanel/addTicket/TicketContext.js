
// import React, { createContext, useContext, useState } from 'react';

// const TicketContext = createContext();

// export const useTickets = () => useContext(TicketContext);

// export const TicketProvider = ({ children }) => {
//   const [tickets, setTickets] = useState([]);

//   const addTicket = (ticket) => {
//     setTickets((prevTickets) => [...prevTickets, ticket]);
//   };

//   return (
//     <TicketContext.Provider value={{ tickets, addTicket }}>
//       {children}
//     </TicketContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from 'react';

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
};
