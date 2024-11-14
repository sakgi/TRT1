const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
// Import route files
const authRoutes = require('./api/auth');
const ticketRoutes = require('./api/ticket');
const userTicketRoutes = require('./api/UserTicketTable');
const allTicketsByRoleRoutes = require('./api/Rolebasedticket');
const adminRoutes = require('./api/admin');
const allTicketRoutes = require('./api/allTicket');
const profileRoutes = require('./api/profile');
const assignedTasksRoutes = require('./api/assignedTasks');
const fetchAssignedTaskRoutes = require('./api/fetchAssignedTicket');
const updateUserRoleRoutes = require('./api/updateUserRole'); 

// Import middleware
const { verifyToken } = require('./middlewares/authorization');

const app = express();
const cors = require('cors');

// Allow requests from your frontend (http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Apply middleware
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Base route to check server status
app.get('/', (req, res) => {
    res.send("Server is up and running");
});


app.use('/allticketsbyrole', allTicketsByRoleRoutes);
// Public routes (no authentication needed)
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/alltickets', allTicketRoutes);
app.use('/update-role', updateUserRoleRoutes);
// Apply verifyToken middleware for all routes that need authentication
app.use(verifyToken);


// Define all authenticated routes
app.use('/tickets', ticketRoutes);  
app.use('/userticketstable', userTicketRoutes);

app.use('/admin', adminRoutes);

app.use('/api', fetchAssignedTaskRoutes);  // Use only once after verifyToken
app.use('/assigned-tasks', assignedTasksRoutes);
 // Allow updating roles without authentication

// Start the server
app.listen(1760, () => {
    console.log("Server listening to port 1760");
});