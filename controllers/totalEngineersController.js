const { db } = require('../config/firebaseConfig'); // Firebase connection
const { collection, query, where, getDocs } = require('firebase/firestore');

const getEngineers = async (req, res) => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'Admin'));
    const querySnapshot = await getDocs(q);
    
    // Log all data to check what the fields actually are
    querySnapshot.forEach((doc) => {
      console.log(doc.data());  // Log Firestore document data to see the structure
    });

    const engineers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      fullName: doc.data().fullName || 'N/A',
      circle: doc.data().circle || 'N/A',
      email: doc.data().email || 'N/A',
      employeeId: doc.data().employeeId || 'N/A',
      phoneNumber: doc.data().phoneNumber || 'N/A',
      organization: doc.data().organization || 'N/A',
      role: doc.data().role || 'N/A',
    }));
    
    res.status(200).json(engineers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching engineers', error });
  }
};


module.exports = { getEngineers };