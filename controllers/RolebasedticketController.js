const { db } = require('../config/adminSDK');

// Fetch tickets for all users: admins, superadmins, and regular users
const fetchAllTicketsByRole = async (req, res) => {
    try {
        // Fetch tickets from the 'TicketDetails' subcollections across all users
        const ticketDetailsSnapshot = await db.collectionGroup('TicketList').get();

        // Check if there are any tickets
        if (ticketDetailsSnapshot.empty) {
            console.log("No tickets found in the TicketDetails collection group.");
            return res.status(404).json({ message: "No tickets found" });
        }

        const tickets = [];
        ticketDetailsSnapshot.forEach(doc => {
            const ticketData = doc.data();
            tickets.push({ id: doc.id, ...ticketData });
        });

        // Respond with the list of all tickets
        res.status(200).json({ message: "Tickets for all roles fetched successfully", tickets });
    } catch (error) {
        console.error("Error fetching tickets for all roles:", error);
        res.status(500).json({ message: "Server error while fetching tickets", error: error.message });
    }
};

module.exports = { fetchAllTicketsByRole };
