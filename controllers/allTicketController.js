// const { db } = require('../config/adminSDK');

// // Fetch all tickets raised by both users and admins
// const fetchAllTickets = async (req, res) => {
//     try {
//         // Fetch tickets from all users' subcollections
//         const userTicketsSnapshot = await db.collectionGroup('TicketDetails').get();

//         const tickets = [];
//         userTicketsSnapshot.forEach(doc => {
//             tickets.push({ id: doc.id, ...doc.data() });
//         });

//         // Respond with a list of all tickets
//         res.status(200).json({ message: "All tickets fetched successfully", tickets });
//     } catch (error) {
//         console.error("Error fetching all tickets:", error);
//         res.status(500).json({ message: "Server error while fetching all tickets", error: error.message });
//     }
// };

// module.exports = { fetchAllTickets };


const { db } = require('../config/adminSDK');

// Fetch tickets raised by the authenticated user based on Employee_ID
const fetchUserTickets = async (req, res) => {
    try {
        // Get Employee_ID from the authenticated user
        const employeeId = req.user.employeeId; // Assuming you've set this in your middleware

        // Fetch the user document where Employee_ID matches
        const userSnapshot = await db.collection('users')
            .where('Employee_ID', '==', employeeId)
            .get();

        const tickets = [];
        
        // Check if user exists
        if (!userSnapshot.empty) {
            // Iterate over each user document found
            for (const userDoc of userSnapshot.docs) {
                // Fetch the TicketDetails subcollection for each user
                const ticketDetailsSnapshot = await userDoc.ref.collection('TicketDetails').get();
                
                ticketDetailsSnapshot.forEach(ticketDoc => {
                    tickets.push({ id: ticketDoc.id, ...ticketDoc.data() });
                });
            }
        }

        // Respond with a list of user's tickets
        res.status(200).json({ message: "User tickets fetched successfully", tickets });
    } catch (error) {
        console.error("Error fetching user tickets:", error);
        res.status(500).json({ message: "Server error while fetching user tickets", error: error.message });
    }
};

module.exports = { fetchUserTickets };
