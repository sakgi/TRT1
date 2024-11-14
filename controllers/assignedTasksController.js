const { db } = require('../config/adminSDK');

// Fetch assigned tickets for the logged-in user
const getAssignedTasks = async (req, res) => {
    try {
        const userId = req.user.uid; // Assuming you're getting the user ID from the request
        const assignedTasks = [];

        // Fetch tickets from the 'TicketDetails' collection where assignedTo matches the user's email
        const snapshot = await db.collectionGroup('TicketDetails')
        .where('assignedTo', '==', req.user.email)  // Assuming the user object has the email
        .get();
      

        if (snapshot.empty) {
            return res.status(404).json({ message: "No assigned tasks found." });
        }

        snapshot.forEach(doc => {
            assignedTasks.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json({ message: "Assigned tasks fetched successfully", assignedTasks });
    } catch (error) {
        console.error("Error fetching assigned tasks:", error);
        res.status(500).json({ message: "Server error while fetching assigned tasks", error: error.message });
    }
};

module.exports = { getAssignedTasks };
