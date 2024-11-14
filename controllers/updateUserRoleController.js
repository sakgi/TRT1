const admin = require('firebase-admin'); // Ensure Firebase Admin SDK is initialized

// Function to update user role
exports.updateUserRole = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const userRef = admin.firestore().collection('users').where('Email', '==', email);
        const snapshot = await userRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ error: "User not found" });
        }

        const batch = admin.firestore().batch(); // Use batch for efficient updates

        snapshot.forEach(doc => {
            batch.update(doc.ref, { role: 'Admin' }); // Update the role to admin
        });

        await batch.commit(); // Commit the batch update

        return res.status(200).json({ message: "User role updated to admin successfully" });
    } catch (error) {
        console.error("Error updating user role:", error);
        return res.status(500).json({ error: "Error updating user role" });
    }
};