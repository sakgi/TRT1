// const {ticketSchema} = require('../models/ticketModel');
// const {db} = require('../config/adminSDK');


// const createTicket = async (req, res) => {
//     const { subject, deviceType, issueType, phoneNumber, description } = req.body;
//     const { error } = ticketSchema.validate({ subject, deviceType, issueType, phoneNumber });
//     if (error) return res.status(400).send({ error: error.details[0].message });
//     const currentYear = new Date().getFullYear().toString().slice(-2);
//     const currentMonth = (`0${new Date().getMonth() + 1}`).slice(-2);

//     try {
//         const snapshot = await db.collection('tickets').get();
//         const ticketCount = snapshot.docs.length + 1;
//         const ticketID = `Insta${currentYear}${currentMonth}${ticketCount.toString().padStart(3, '0')}`;
//         const ticketData = {
//             TicketID: ticketID,
//             Subject: subject,
//             DeviceType: deviceType,
//             IssueType: issueType,
//             PhoneNumber: phoneNumber,
//             Description: description,
//             CreatedAt: new Date().toISOString()
//         };
//         await db.collection('tickets').doc(ticketID).set(ticketData);
//         return res.status(201).send({
//             statusCode: 201,
//             message: "Ticket created successfully",
//             ticketID,
//             ticketData
//         });
//     } catch (err) {
//         console.error("Error creating ticket: ", err);
//         return res.status(500).send({
//             message: "Something went wrong",
//             error: err.message
//         });
//     }
// };


// const getTicketList = async (req, res)=>{
//     const ticketList = [];
//     try{
//         const snapshot = await db.collection('tickets').get();
//         if(snapshot.empty){
//             return res.status(400).send({message: "No data available"});
//         }
//         snapshot.forEach(doc => {
//             ticketList.push(doc.data());
//         });
//         return res.status(200).send({message: "List fetched successfully", data: ticketList});
//     }
//     catch(err){
//         return res.status(500).send({message: "Something went wrong", error: err});
//     }
// };


// module.exports = {createTicket, getTicketList};

// src/controllers/ticketController.js
// const { getFirestore } = require('firebase-admin/firestore');
// const { getStorage } = require('firebase-admin/storage');
// const { db, bucket } = require('../config/adminSDK')

// exports.createTicket = async (req, res) => {
//     try {
//         const { subject, deviceType, issueType, phoneNumber, description } = req.body;
//         const file = req.file;

//         // Basic validation
//         if (!subject || !deviceType || !issueType || !phoneNumber || !file) {
//             return res.status(400).json({ message: 'Please fill all mandatory fields.' });
//         }

//         // Upload the attachment to Firebase storage
//         const ticketID = `INSTA${Date.now()}`;
//         const fileName = `${ticketID}_${file.originalname}`;
//         const fileRef = bucket.file(`ticket_attachments/${fileName}`);

//         // Save the file to Firebase storage
//         await fileRef.save(file.buffer, {
//             metadata: {
//                 contentType: file.mimetype,
//             },
//         });

//         // Get download URL of the uploaded file
//         const downloadURL = await fileRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });

//         // Create ticket data to store in Firestore
//         const ticketData = {
//             subject,
//             deviceType,
//             issueType,
//             phoneNumber,
//             description,
//             attachmentURL: downloadURL[0], // Firebase file download URL
//             date: new Date().toLocaleDateString(),
//             time: new Date().toLocaleTimeString(),
//         };

//         // Save the ticket data in Firestore
//         await db.collection('tickets').doc(ticketID).set(ticketData);

//         res.status(200).json({ message: 'Ticket raised successfully!', ticketID });
//     } catch (error) {
//         console.error('Error raising ticket:', error);
//         res.status(500).json({ message: 'Server error occurred while raising ticket.' });
//     }
// };
// const { getFirestore } = require('firebase-admin/firestore');
// const { getStorage } = require('firebase-admin/storage');
// const { db, bucket } = require('../config/adminSDK');

// // Helper function to generate the next ticket ID
// async function generateTicketId() {
//     const prefix = 'INSTA';  // Fixed prefix
//     const now = new Date();
//     const year = now.getFullYear().toString().slice(2);  // Get last two digits of year
//     const month = (now.getMonth() + 1).toString().padStart(2, '0');  // Get month, ensure two digits

//     // Fetch the latest ticket from Firestore
//     const ticketsRef = db.collection('tickets').orderBy('ticketID', 'desc').limit(1);
//     const latestTicketDoc = await ticketsRef.get();

//     let newTicketNumber = 1;  // Default to 1 if no tickets exist

//     if (!latestTicketDoc.empty) {
//         // Get the last ticket's ID and extract the count
//         const latestTicketId = latestTicketDoc.docs[0].data().ticketID;

//         // Extract the last three digits (ticket count)
//         const lastTicketCount = parseInt(latestTicketId.slice(-3), 10);

//         // Increment the count for the new ticket
//         newTicketNumber = lastTicketCount + 1;
//     }

//     // Ensure the count is always three digits (e.g., 008)
//     const newTicketCount = newTicketNumber.toString().padStart(3, '0');

//     // Return the new ticket ID in the format: INSTAYYMMXXX
//     return `${prefix}${year}${month}${newTicketCount}`;
// }

// exports.createTicket = async (req, res) => {
//     try {
//         const { subject, deviceType, issueType, phoneNumber, description } = req.body;
//         const file = req.file;

//         // Basic validation
//         if (!subject || !deviceType || !issueType || !phoneNumber || !file) {
//             return res.status(400).json({ message: 'Please fill all mandatory fields.' });
//         }

//         // Generate a new ticket ID
//         const ticketID = await generateTicketId();

//         // Upload the attachment to Firebase storage
//         const fileName = `${ticketID}_${file.originalname}`;
//         const fileRef = bucket.file(`ticket_attachments/${fileName}`);

//         // Save the file to Firebase storage
//         await fileRef.save(file.buffer, {
//             metadata: {
//                 contentType: file.mimetype,
//             },
//         });

//         // Get download URL of the uploaded file
//         const downloadURL = await fileRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });

//         // Create ticket data to store in Firestore
//         const ticketData = {
//             subject,
//             deviceType,
//             issueType,
//             phoneNumber,
//             description,
//             attachmentURL: downloadURL[0],  // Firebase file download URL
//             date: new Date().toLocaleDateString(),
//             time: new Date().toLocaleTimeString(),
//             ticketID,  // Add the generated ticket ID
//             status: 'Raised',
//             employeeID,
//             userName,
//         };

//         // Save the ticket data in Firestore with the generated ticket ID as the document ID
//         const userTicketsRef = db.collection('users').doc(userId).collection('TicketDetails');

//         // Use the generated ticketID as the document ID in the sub-collection
//         await userTicketsRef.doc(ticketID).set(ticketData);

//         res.status(200).json({ message: 'Ticket raised successfully!', ticketID });
//     } catch (error) {
//         console.error('Error raising ticket:', error);
//         res.status(500).json({ message: 'Server error occurred while raising ticket.' });
//     }
// };












// const { getFirestore } = require('firebase-admin/firestore');
// const { getStorage } = require('firebase-admin/storage');
// const { db, bucket } = require('../config/adminSDK');

// // Helper function to generate the next ticket ID
// async function generateTicketId(userId) {
//     const prefix = 'INSTAA';  // Fixed prefix
//     const now = new Date();
//     const year = now.getFullYear().toString().slice(2);  // Get last two digits of year
//     const month = (now.getMonth() + 1).toString().padStart(2, '0');  // Get month, ensure two digits

//     // Fetch the latest ticket from Firestore
//     const ticketsRef = db.collection('users').doc(userId).collection('TicketDetails').orderBy('ticketID', 'desc').limit(1);
//     const latestTicketDoc = await ticketsRef.get();

//     let newTicketNumber = 1;  // Default to 1 if no tickets exist

//     if (!latestTicketDoc.empty) {
//         // Get the last ticket's ID and extract the count
//         const latestTicketId = latestTicketDoc.docs[0].data().ticketID;

//         // Extract the last three digits (ticket count)
//         const lastTicketCount = parseInt(latestTicketId.slice(-3), 10);

//         // Increment the count for the new ticket
//         newTicketNumber = lastTicketCount + 1;
//     }

//     // Ensure the count is always three digits (e.g., 008)
//     const newTicketCount = newTicketNumber.toString().padStart(3, '0');

//     // Return the new ticket ID in the format: INSTAYYMMXXX
//     return `${prefix}${year}${month}${newTicketCount}`;
// }

// exports.createTicket = async (req, res) => {
//     try {
//         const { subject, deviceType, issueType, phoneNumber, description } = req.body; 
//         const file = req.file;

//         // Basic validation
//         if (!subject || !deviceType || !issueType || !phoneNumber || !file) {
//             return res.status(400).json({ message: 'Please fill all mandatory fields.' });
//         }

//         // Get userId from the authenticated user
//         const userId = req.user.uid; 

//         // Fetch user data to get Employee_ID from Firestore
//         const userDoc = await db.collection('users').doc(userId).get();
//         if (!userDoc.exists) {
//             return res.status(404).json({ message: 'User not found.' });
//         }
        
//         const userData = userDoc.data();
//         console.log('Fetched user data:', userData); // Debugging log
        
//         // Use the correct field name
//         const employeeID = userData.Employee_ID; // Change this line to match the field name
//         const userName = userData.First_Name + ' ' + userData.Last_Name; // Combine first and last name if needed

//         // Check if employeeID is defined
//         if (!employeeID) {
//             return res.status(400).json({ message: 'Employee ID not found for this user.' });
//         }

//         // Generate a new ticket ID
//         const ticketID = await generateTicketId(userId);

//         // Upload the attachment to Firebase storage
//         const fileName = `${ticketID}_${file.originalname}`;
//         const fileRef = bucket.file(`ticket_attachments/${fileName}`);

//         // Save the file to Firebase storage
//         await fileRef.save(file.buffer, {
//             metadata: {
//                 contentType: file.mimetype,
//             },
//         });

//         // Get download URL of the uploaded file
//         const downloadURL = await fileRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });

//         // Create ticket data to store in Firestore
//         const ticketData = {
//             subject,
//             deviceType,
//             issueType,
//             createdBy: userId,
//             phoneNumber,
//             description,
//             attachmentURL: downloadURL[0],  // Firebase file download URL
//             date: new Date().toLocaleDateString(),
//             time: new Date().toLocaleTimeString(),
//             ticketID,  // Add the generated ticket ID
//             status: 'Raised',
//             employeeID, // Use employeeID fetched from user data
//             userName, // Use userName fetched from user data
//             assignedTo: assignedToEmail,

//         };

//         // Save the ticket data in Firestore with the generated ticket ID as the document ID
//         const userTicketsRef = db.collection('users').doc(userId).collection('TicketDetails');

//         // Use the generated ticketID as the document ID in the sub-collection
//         await userTicketsRef.doc(ticketID).set(ticketData);

//         res.status(200).json({ message: 'Ticket raised successfully!', ticketData });
//     } catch (error) {
//         console.error('Error raising ticket:', error);
//         res.status(500).json({ message: 'Server error occurred while raising ticket.' });
//     }
// };














const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { db, bucket } = require('../config/adminSDK');

// Helper function to generate the next ticket ID
async function generateTicketId(userId) {
    const prefix = 'INSTAA';
    const now = new Date();
    const year = now.getFullYear().toString().slice(2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');

    const ticketsRef = db.collection('users').doc(userId).collection('TicketDetails').orderBy('ticketID', 'desc').limit(1);
    const latestTicketDoc = await ticketsRef.get();

    let newTicketNumber = 1;

    if (!latestTicketDoc.empty) {
        const latestTicketId = latestTicketDoc.docs[0].data().ticketID;
        const lastTicketCount = parseInt(latestTicketId.slice(-3), 10);
        newTicketNumber = lastTicketCount + 1;
    }

    const newTicketCount = newTicketNumber.toString().padStart(3, '0');
    return `${prefix}${year}${month}${newTicketCount}`;
}

// Function to create a new ticket with null assignedId and assignedName
exports.createTicket = async (req, res) => {
    try {
        const { subject, deviceType, issueType, phoneNumber} = req.body; 
        const file = req.file;

        if (!subject || !deviceType || !issueType || !phoneNumber || !file) {
            return res.status(400).json({ message: 'Please fill all mandatory fields.' });
        }

        const userId = req.user.uid; 

        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const userData = userDoc.data();
        const employeeID = userData.Employee_ID;
        const userName = `${userData.First_Name} ${userData.Last_Name}`;

        if (!employeeID) {
            return res.status(400).json({ message: 'Employee ID not found for this user.' });
        }

        const ticketID = await generateTicketId(userId);

        const fileName = `${ticketID}_${file.originalname}`;
        const fileRef = bucket.file(`ticket_attachments/${fileName}`);
        await fileRef.save(file.buffer, { metadata: { contentType: file.mimetype } });

        const downloadURL = await fileRef.getSignedUrl({ action: 'read', expires: '03-01-2500' });

        const ticketData = {
            subject,
            deviceType,
            issueType,
            createdBy: userId,
            phoneNumber,
            description,
            attachmentURL: downloadURL[0],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            ticketID,
            status: 'Raised',
            employeeID,
            userName,
            // assignedTo: assignedToEmail,
            assignedId: null,       // Initially set to null
            assignedName: null      // Initially set to null
        };

        const userTicketsRef = db.collection('users').doc(userId).collection('TicketDetails');
        await userTicketsRef.doc(ticketID).set(ticketData);

        res.status(200).json({ message: 'Ticket raised successfully!', ticketData });
    } catch (error) {
        console.error('Error raising ticket:', error);
        res.status(500).json({ message: 'Server error occurred while raising ticket.' });
    }
};

// Function to assign a ticket to a user by updating assignedId and assignedName
exports.assignTicket = async (req, res) => {
    try {
        const { userId, ticketID, assignedToId } = req.body;

        // Fetch assigned user data based on assignedToId
        const assignedUserDoc = await db.collection('users').doc(assignedToId).get();
        if (!assignedUserDoc.exists) {
            return res.status(404).json({ message: 'Assigned user not found.' });
        }

        const assignedUserData = assignedUserDoc.data();
        const assignedId = assignedUserData.Employee_ID;
        const assignedName = `${assignedUserData.First_Name} ${assignedUserData.Last_Name}`;

        // Update the ticket with assignedId and assignedName
        const ticketRef = db.collection('users').doc(userId).collection('TicketDetails').doc(ticketID);
        await ticketRef.update({ assignedId, assignedName });

        res.status(200).json({ message: 'Ticket assigned successfully!', ticketID, assignedId, assignedName });
    } catch (error) {
        console.error('Error assigning ticket:', error);
        res.status(500).json({ message: 'Server error occurred while assigning ticket.' });
    }
};





















































// const { db, storage } = require('../config/adminSDK');
// const { v4: uuidv4 } = require('uuid');

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
//     console.log("Request body:", req.body);
//     console.log("Uploaded file:", req.file);

//     const { subject, description, onBehalfOf, Employee_ID, deviceType, issueType, assignedToEmail } = req.body;

//     // Validate required fields
//     if (!subject || !description || !onBehalfOf || !deviceType || !issueType) {
//       return res.status(400).json({ message: "Please provide subject, description, onBehalfOf, deviceType, and issueType." });
//     }

//     let userId;
//     let raisedByName;

//     if (onBehalfOf === 'self') {
//       userId = req.user.uid; // Assuming req.user is set correctly
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

//     // Date format: 30/9/2024 (without leading zeros)
//     const date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();

//     // Time format: 4:09:52 pm (12-hour format with AM/PM)
//     const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

//     // Create the ticket object with the assigned user's email, ID, and name
//     const ticketData = {
//       subject,
//       description,
//       deviceType,
//       issueType,
//       Employee_ID: Employee_ID || userId,
//       raisedByName,
//       createdAt: new Date(),
//       date,  // Store the date in the format 30/9/2024
//       time,  // Store the time in the format 4:09:52 pm
//       status: "Open",
//       ticketID,
//       attachmentUrl,        // Store the attachment URL in Firestore if file exists
//       assignedTo: assignedToEmailFinal,  // Store the assigned user's email in Firestore
//       assignedId,           // Initially null if no assignedToEmail is provided
//       assignedName,         // Initially null if no assignedToEmail is provided
//       priority: null        // Default priority set to null
//     };

//     // Save ticket in Firestore under the user
//     await db.collection('users').doc(userId).collection('TicketDetails').doc(ticketID).set(ticketData);

//     // Respond with success and the ticket data
//     res.status(201).json({ message: "Ticket created successfully", ticket: ticketData });
//   } catch (error) {
//     console.error("Error creating ticket:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Fetch all tickets for a specific assigned user
// const fetchAllTickets = async (req, res) => {
//   try {
//     const { assignedTo } = req.body;  // Get the assigned user email from the request

//     if (!assignedTo) {
//       return res.status(400).json({ message: "Please provide assigned user email." });
//     }

//     // Fetch all tickets where the 'assignedTo' field matches the provided user email
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

// module.exports = { createAdminTicket, fetchAllTickets };
