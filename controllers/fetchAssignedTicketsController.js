const { db } = require('../config/adminSDK');

// Controller to fetch tickets assigned to the logged-in employee
const fetchAssignedTickets = async (req, res) => {
  try {
    const assignedEmail = req.user.email;  // Assuming req.user contains the logged-in user's email

    if (!assignedEmail) {
      return res.status(400).json({ message: 'Assigned user email is required.' });
    }

    // Fetch all tickets where 'assignedTo' matches the logged-in user's email
    const ticketsSnapshot = await db.collectionGroup('TicketDetails').where('assignedTo', '==', assignedEmail).get();

    if (ticketsSnapshot.empty) {
      return res.status(404).json({ message: 'No tickets found assigned to you.' });
    }

    const tickets = [];
    ticketsSnapshot.forEach(doc => {
      tickets.push({ id: doc.id, ...doc.data() });
    });

    // Return the fetched tickets
    return res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching assigned tickets:', error);
    return res.status(500).json({ message: 'Server error', error: error });
  }
};

module.exports = { fetchAssignedTickets };
