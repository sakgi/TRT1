// const { db, storage } = require('../config/adminSDK');
// const { v4: uuidv4 } = require('uuid');
// const { getAuth } = require('firebase-admin/auth');  // Import getAuth from firebase-admin

// // Middleware for verifying the Firebase ID token
// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];  // Extract the token from the Authorization header
//   if (!token) {
//     return res.status(403).json({ message: "No token provided. Unauthorized access." });
//   }

//   try {
//     const decodedToken = await getAuth().verifyIdToken(token);
//     req.user = decodedToken;  // Store decoded token in request
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(401).json({ message: "Unauthorized access. Invalid token." });
//   }
// };

// // Function to upload files to Firebase Storage
// const uploadFileToStorage = async (file) => {
//   const bucket = storage.bucket();  // Access your Firebase Storage bucket
//   const fileName = `${uuidv4()}-${file.originalname}`;  // Generate a unique file name
//   const fileUpload = bucket.file(fileName);

//   const stream = fileUpload.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,  // Set content type (image/jpeg, etc.)
//     },
//   });

//   return new Promise((resolve, reject) => {
//     stream.on('error', reject);
//     stream.on('finish', () => {
//       // Get the file's signed URL after it's uploaded
//       fileUpload.getSignedUrl({
//         action: 'read',
//         expires: Date.now() + 1000 * 60 * 60,  // 1-hour expiration
//       }).then(urls => resolve(urls[0]))  // Resolve the URL (urls[0])
//         .catch(reject);
//     });
//     stream.end(file.buffer);  // End the stream after writing the file to Firebase Storage
//   });
// };

// // Function to generate the ticket ID
// const generateTicketId = async (userId) => {
//   const prefix = 'INSTAA';
//   const now = new Date();
//   const year = now.getFullYear().toString().slice(2);
//   const month = (now.getMonth() + 1).toString().padStart(2, '0');

//   // Get the last created ticket
//   const ticketsRef = db.collection('users').doc(userId).collection('TicketDetails')
//                         .orderBy('ticketID', 'desc').limit(1);
//   const latestTicketDoc = await ticketsRef.get();

//   let newTicketNumber = 1;
//   if (!latestTicketDoc.empty) {
//     const latestTicketId = latestTicketDoc.docs[0].data().ticketID;
//     const lastTicketCount = parseInt(latestTicketId.slice(-3), 10);
//     newTicketNumber = lastTicketCount + 1;
//   }

//   const newTicketCount = newTicketNumber.toString().padStart(3, '0');
//   return `${prefix}${year}${month}${newTicketCount}`;
// };

// // Create a new admin ticket
// const createAdminTicket = async (req, res) => {
//   try {
//     const { subject, description, onBehalfOf, Employee_ID, deviceType, issueType, assignedToEmail } = req.body;

//     // Validate required fields
//     if (!subject || !description || !onBehalfOf || !deviceType || !issueType) {
//       return res.status(400).json({ message: "Please provide subject, description, onBehalfOf, deviceType, and issueType." });
//     }

//     let userId;
//     let raisedByName;

//     if (onBehalfOf === 'self') {
//       userId = req.user.uid;  // User's UID from the token
//       raisedByName = 'Admin';
//     } else if (onBehalfOf === 'others') {
//       if (!Employee_ID) {
//         return res.status(400).json({ message: "Employee ID is required when raising a ticket for others." });
//       }

//       const employeeDoc = await db.collection('users').where('Employee_ID', '==', Employee_ID).get();
//       if (employeeDoc.empty) {
//         return res.status(404).json({ message: "Employee not found." });
//       }

//       const employeeData = employeeDoc.docs[0].data();
//       userId = employeeDoc.docs[0].id;
//       raisedByName = `${employeeData.First_Name} ${employeeData.Last_Name}`;
//     } else {
//       return res.status(400).json({ message: 'Invalid selection for onBehalfOf. Please choose "self" or "others".' });
//     }

//     // Generate ticket ID
//     const ticketID = await generateTicketId(userId);

//     // Handle file upload if attachment exists
//     let attachmentUrl = null;
//     if (req.file) {
//       attachmentUrl = await uploadFileToStorage(req.file);
//     }

//     // Handle assignedToEmail logic
//     let assignedToEmailFinal = null;
//     let assignedId = null;
//     let assignedName = null;
//     if (assignedToEmail) {
//       const assignedUserDoc = await db.collection('users').where('Email', '==', assignedToEmail).get();
//       if (assignedUserDoc.empty) {
//         return res.status(404).json({ message: "Assigned employee with this email not found." });
//       }

//       const assignedUserData = assignedUserDoc.docs[0].data();
//       assignedToEmailFinal = assignedUserData.Email;  // Store the assigned user's email directly
//       assignedId = assignedUserDoc.docs[0].id;        // Store the assigned user's ID
//       assignedName = `${assignedUserData.First_Name} ${assignedUserData.Last_Name}`;  // Store the assigned user's full name
//     }

//     // Get current date and time separately
//     const now = new Date();
//     const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
//     const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

//     // Create the ticket object
//     const ticketData = {
//       subject,
//       createdBy: req.user.uid,
//       description,
//       deviceType,
//       issueType,
//       Employee_ID: Employee_ID || userId,
//       raisedByName,
//       createdAt: new Date(),
//       date,
//       time,
//       status: "Open",
//       ticketID,
//       attachmentUrl,
//       assignedTo: assignedToEmailFinal,
//       assignedId,
//       assignedName,
//       priority: null
//     };

//     // Save ticket in Firestore
//     await db.collection('users').doc(userId).collection('TicketDetails').doc(ticketID).set(ticketData);

//     res.status(201).json({ message: "Ticket created successfully", ticket: ticketData });
//   } catch (error) {
//     console.error("Error creating ticket:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Fetch all tickets for a specific assigned user
// const fetchAllTickets = async (req, res) => {
//   try {
//     const { assignedTo } = req.body;

//     if (!assignedTo) {
//       return res.status(400).json({ message: "Please provide assigned user email." });
//     }

//     const ticketsSnapshot = await db.collectionGroup('TicketDetails').where('assignedTo', '==', assignedTo).get();

//     const tickets = [];
//     ticketsSnapshot.forEach(doc => {
//       tickets.push({ id: doc.id, ...doc.data() });
//     });

//     res.status(200).json(tickets);
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = {
//   createAdminTicket: [verifyToken, createAdminTicket],
//   fetchAllTickets: [verifyToken, fetchAllTickets]
// };







// const { db, storage } = require('../config/adminSDK');
// const { v4: uuidv4 } = require('uuid');
// const { getAuth } = require('firebase-admin/auth');  // Import getAuth from firebase-admin

// // Middleware for verifying the Firebase ID token
// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];  // Extract the token from the Authorization header
//   if (!token) {
//     return res.status(403).json({ message: "No token provided. Unauthorized access." });
//   }

//   try {
//     const decodedToken = await getAuth().verifyIdToken(token);
//     req.user = decodedToken;  // Store decoded token in request
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(401).json({ message: "Unauthorized access. Invalid token." });
//   }
// };

// // Function to upload files to Firebase Storage
// const uploadFileToStorage = async (file) => {
//   const bucket = storage.bucket();  // Access your Firebase Storage bucket
//   const fileName = `${uuidv4()}-${file.originalname}`;  // Generate a unique file name
//   const fileUpload = bucket.file(fileName);

//   const stream = fileUpload.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,  // Set content type (image/jpeg, etc.)
//     },
//   });

//   return new Promise((resolve, reject) => {
//     stream.on('error', reject);
//     stream.on('finish', () => {
//       // Get the file's signed URL after it's uploaded
//       fileUpload.getSignedUrl({
//         action: 'read',
//         expires: Date.now() + 1000 * 60 * 60,  // 1-hour expiration
//       }).then(urls => resolve(urls[0]))  // Resolve the URL (urls[0])
//         .catch(reject);
//     });
//     stream.end(file.buffer);  // End the stream after writing the file to Firebase Storage
//   });
// };

// // Function to generate the ticket ID
// const generateTicketId = async (userId) => {
//   const prefix = 'INSTAA';
//   const now = new Date();
//   const year = now.getFullYear().toString().slice(2);
//   const month = (now.getMonth() + 1).toString().padStart(2, '0');

//   // Get the last created ticket
//   const ticketsRef = db.collection('users').doc(userId).collection('TicketDetails')
//                         .orderBy('ticketID', 'desc').limit(1);
//   const latestTicketDoc = await ticketsRef.get();

//   let newTicketNumber = 1;
//   if (!latestTicketDoc.empty) {
//     const latestTicketId = latestTicketDoc.docs[0].data().ticketID;
//     const lastTicketCount = parseInt(latestTicketId.slice(-3), 10);
//     newTicketNumber = lastTicketCount + 1;
//   }

//   const newTicketCount = newTicketNumber.toString().padStart(3, '0');
//   return `${prefix}${year}${month}${newTicketCount}`;
// };

// // Create a new admin ticket
// const createAdminTicket = async (req, res) => {
//   try {
//     const { subject, description, onBehalfOf, Employee_ID, deviceType, issueType, assignedToEmail } = req.body;

//     // Validate required fields
//     if (!subject  || !onBehalfOf || !deviceType || !issueType) {
//       return res.status(400).json({ message: "Please provide subject, description, onBehalfOf, deviceType, and issueType." });
//     }

//     let userId;
//     let raisedByName;

//     if (onBehalfOf === 'self') {
//       userId = req.user.uid;  // User's UID from the token
//       raisedByName = 'Admin';
//     } else if (onBehalfOf === 'others') {
//       if (!Employee_ID) {
//         return res.status(400).json({ message: "Employee ID is required when raising a ticket for others." });
//       }

//       const employeeDoc = await db.collection('users').where('Employee_ID', '==', Employee_ID).get();
//       if (employeeDoc.empty) {
//         return res.status(404).json({ message: "Employee not found." });
//       }

//       const employeeData = employeeDoc.docs[0].data();
//       userId = employeeDoc.docs[0].id;
//       raisedByName = `${employeeData.First_Name} ${employeeData.Last_Name}`;
//     } else {
//       return res.status(400).json({ message: 'Invalid selection for onBehalfOf. Please choose "self" or "others".' });
//     }

//     // Generate ticket ID
//     const ticketID = await generateTicketId(userId);

//     // Handle file upload if attachment exists
//     let attachmentUrl = null;
//     if (req.file) {
//       attachmentUrl = await uploadFileToStorage(req.file);
//     }

//     // Handle assignedToEmail logic
//     let assignedToEmailFinal = null;
//     let assignedId = null;
//     let assignedName = null;
//     if (assignedToEmail) {
//       const assignedUserDoc = await db.collection('users').where('Email', '==', assignedToEmail).get();
//       if (assignedUserDoc.empty) {
//         return res.status(404).json({ message: "Assigned employee with this email not found." });
//       }

//       const assignedUserData = assignedUserDoc.docs[0].data();
//       assignedToEmailFinal = assignedUserData.Email;  // Store the assigned user's email directly
//       assignedId = assignedUserDoc.docs[0].id;        // Store the assigned user's ID
//       assignedName = `${assignedUserData.First_Name} ${assignedUserData.Last_Name}`;  // Store the assigned user's full name
//     }

//     // Get current date and time separately
//     const now = new Date();
//     const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
//     const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

//     // Create the ticket object
//     const ticketData = {
//       subject,
//       createdBy: req.user.uid,
//       description,
//       deviceType,
//       issueType,
//       Employee_ID: Employee_ID || userId,
//       raisedByName,
//       createdAt: new Date(),
//       date,
//       time,
//       status: "Raised",
//       ticketID,
//       attachmentUrl,
//       assignedTo: assignedToEmailFinal,
//       assignedId,
//       assignedName,
//       priority: null
//     };

//     // Save ticket in Firestore in both TicketDetails and TicketList collections
//     await db.collection('users').doc(userId).collection('TicketDetails').doc(ticketID).set(ticketData);
//     await db.collection('TicketList').doc(ticketID).set(ticketData);

//     res.status(201).json({ message: "Ticket created successfully", ticket: ticketData });
//   } catch (error) {
//     console.error("Error creating ticket:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Fetch all tickets for a specific assigned user
// const fetchAllTickets = async (req, res) => {
//   try {
//     const { assignedTo } = req.body;

//     if (!assignedTo) {
//       return res.status(400).json({ message: "Please provide assigned user email." });
//     }

//     const ticketsSnapshot = await db.collectionGroup('TicketDetails').where('assignedTo', '==', assignedTo).get();

//     const tickets = [];
//     ticketsSnapshot.forEach(doc => {
//       tickets.push({ id: doc.id, ...doc.data() });
//     });

//     res.status(200).json(tickets);
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = {
//   createAdminTicket: [verifyToken, createAdminTicket],
//   fetchAllTickets: [verifyToken, fetchAllTickets]
// };










const { db, storage } = require('../config/adminSDK');
const { v4: uuidv4 } = require('uuid');
const { getAuth } = require('firebase-admin/auth');  // Import getAuth from firebase-admin

// Middleware for verifying the Firebase ID token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];  // Extract the token from the Authorization header
  if (!token) {
    return res.status(403).json({ message: "No token provided. Unauthorized access." });
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;  // Store decoded token in request
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized access. Invalid token." });
  }
};

// Function to upload files to Firebase Storage
const uploadFileToStorage = async (file) => {
  const bucket = storage.bucket();  // Access your Firebase Storage bucket
  const fileName = `${uuidv4()}-${file.originalname}`;  // Generate a unique file name
  const fileUpload = bucket.file(fileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,  // Set content type (image/jpeg, etc.)
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', () => {
      // Get the file's signed URL after it's uploaded
      fileUpload.getSignedUrl({
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60,  // 1-hour expiration
      }).then(urls => resolve(urls[0]))  // Resolve the URL (urls[0])
        .catch(reject);
    });
    stream.end(file.buffer);  // End the stream after writing the file to Firebase Storage
  });
};

// Function to generate the ticket ID
const generateTicketId = async (userId) => {
  const prefix = 'INSTAA';
  const now = new Date();
  const year = now.getFullYear().toString().slice(2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');

  // Get the last created ticket
  const ticketsRef = db.collection('users').doc(userId).collection('TicketDetails')
                        .orderBy('ticketID', 'desc').limit(1);
  const latestTicketDoc = await ticketsRef.get();

  let newTicketNumber = 1;
  if (!latestTicketDoc.empty) {
    const latestTicketId = latestTicketDoc.docs[0].data().ticketID;
    const lastTicketCount = parseInt(latestTicketId.slice(-3), 10);
    newTicketNumber = lastTicketCount + 1;
  }

  const newTicketCount = newTicketNumber.toString().padStart(3, '0');
  return `${prefix}${year}${month}${newTicketCount}`;
};

// Function to format date as dd/MM/yyyy
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Create a new admin ticket
const createAdminTicket = async (req, res) => {
  try {
    const { subject, description, onBehalfOf, Employee_ID, deviceType, issueType, assignedToEmail } = req.body;

    // Validate required fields
    if (!subject || !onBehalfOf || !deviceType || !issueType) {
      return res.status(400).json({ message: "Please provide subject, description, onBehalfOf, deviceType, and issueType." });
    }

    let userId;
    let raisedByName;

    if (onBehalfOf === 'self') {
      userId = req.user.uid;  // User's UID from the token
      raisedByName = 'Admin';
    } else if (onBehalfOf === 'others') {
      if (!Employee_ID) {
        return res.status(400).json({ message: "Employee ID is required when raising a ticket for others." });
      }

      const employeeDoc = await db.collection('users').where('Employee_ID', '==', Employee_ID).get();
      if (employeeDoc.empty) {
        return res.status(404).json({ message: "Employee not found." });
      }

      const employeeData = employeeDoc.docs[0].data();
      userId = employeeDoc.docs[0].id;
      raisedByName = `${employeeData.First_Name} ${employeeData.Last_Name}`;
    } else {
      return res.status(400).json({ message: 'Invalid selection for onBehalfOf. Please choose "self" or "others".' });
    }

    // Generate ticket ID
    const ticketID = await generateTicketId(userId);

    // Handle file upload if attachment exists
    let attachmentUrl = null;
    if (req.file) {
      attachmentUrl = await uploadFileToStorage(req.file);
    }

    // Handle assignedToEmail logic
    let assignedToEmailFinal = null;
    let assignedId = null;
    let assignedName = null;
    if (assignedToEmail) {
      const assignedUserDoc = await db.collection('users').where('Email', '==', assignedToEmail).get();
      if (assignedUserDoc.empty) {
        return res.status(404).json({ message: "Assigned employee with this email not found." });
      }

      const assignedUserData = assignedUserDoc.docs[0].data();
      assignedToEmailFinal = assignedUserData.Email;  // Store the assigned user's email directly
      assignedId = assignedUserDoc.docs[0].id;        // Store the assigned user's ID
      assignedName = `${assignedUserData.First_Name} ${assignedUserData.Last_Name}`;  // Store the assigned user's full name
    }

    // Get current date and time separately
    const now = new Date();
    const date = formatDate(now); // Use the formatDate function to format the date
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

    // Create the ticket object
    const ticketData = {
      subject,
      createdBy: req.user.uid,
      description,
      deviceType,
      issueType,
      Employee_ID: Employee_ID || userId,
      raisedByName,
      createdAt: new Date(),
      date,
      time,
      status: "Raised",
      ticketID,
      attachmentUrl,
      assignedTo: assignedToEmailFinal,
      assignedId,
      assignedName,
      priority: null
    };

    // Save ticket in Firestore in both TicketDetails and TicketList collections
    await db.collection('users').doc(userId).collection('TicketDetails').doc(ticketID).set(ticketData);
    await db.collection('TicketList').doc(ticketID).set(ticketData);

    res.status(201).json({ message: "Ticket created successfully", ticket: ticketData });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all tickets for a specific assigned user
const fetchAllTickets = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({ message: "Please provide assigned user email." });
    }

    const ticketsSnapshot = await db.collectionGroup('TicketDetails').where('assignedTo', '==', assignedTo).get();

    const tickets = [];
    ticketsSnapshot.forEach(doc => {
      tickets.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createAdminTicket: [verifyToken, createAdminTicket],
  fetchAllTickets: [verifyToken, fetchAllTickets]
};