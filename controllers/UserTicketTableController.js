const { admin } = require('../config/adminSDK');

const fetchUserTickets = async (req, res) => {
    try {
        const userId = req.params.userId;
        const db = admin.firestore();
        const ticketsSnapshot = await db.collection('users').doc(userId).collection('TicketDetails').get();

        const tickets = [];
        ticketsSnapshot.forEach(doc => {
            tickets.push({ id: doc.id, ...doc.data() });
        });

        return res.status(200).json({ tickets });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching tickets', error });
    }
};

module.exports = { fetchUserTickets };  // Ensure this is correctly exported
