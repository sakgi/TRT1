/my-trt1
│
├── /client (React Frontend)
│   ├── /public
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── /node_modules(include node modules)
│   ├── /src
│   │   ├── /components
│   │   │   ├── /AdminPanel
│   │   │   │   ├── Navbar.css
│   │   │   │   └── Navbar.js
│   │   │   ├── /UserPanel
│   │   │   │   ├──/Faq
│   │   │   │   │  ├── Faq.css
│   │   │   │   │  └── Faq.js
│   │   │   │   ├──/Mytickets
│   │   │   │   │  ├── Mytickets.css
│   │   │   │   │  └── Mytickets.js
│   │   │   │   ├──/Navbar
│   │   │   │   │  ├── Logo.png
│   │   │   │   │  ├── Navbar.css
│   │   │   │   │  └── Navbar.js
│   │   │   │   ├──/Sidebar
│   │   │   │   │  ├── Sidebar.css
│   │   │   │   │  └── Sidebar.js
│   │   │   │   ├──/TicketCreation
│   │   │   │   │  ├── TicketCreation.css
│   │   │   │   │  └── TicketCreation.js
│   │   │   │   ├──/TicketsTable
│   │   │   │   │  ├── TicketsTable.css
│   │   │   │   │  └── TicketsTable.js
│   │   │   │   ├── 124600.jpeg
│   │   │   │   ├── UserDashboard.css
│   │   │   │   └── UserDashboard.js
│   │   │   ├── /SuperAdminPanel
│   │   │   │   ├──/AddEngineer
│   │   │   │   │  ├── AddEngineer.css
│   │   │   │   │  └── AddEngineer.js
│   │   │   │   ├──/ChangePassword
│   │   │   │   │  ├── ChangePassword.css
│   │   │   │   │  └── ChangePassword.js
│   │   │   │   ├──/NewTicket
│   │   │   │   │  ├── NewTicket.css
│   │   │   │   │  └── NewTicket.js
│   │   │   │   ├──/ReportGeneration
│   │   │   │   │  ├── ReportGeneration.css
│   │   │   │   │  └── ReportGeneration.js
│   │   │   │   ├──/SuperAdminEngineerManag
│   │   │   │   │  ├── SuperAdminEngineerManag.css
│   │   │   │   │  └── SuperAdminEngineerManag.js
│   │   │   │   ├──/SuperAdminMyTickets
│   │   │   │   │  ├── SuperAdminMyTickets.css
│   │   │   │   │  └── SuperAdminMyTickets.js
│   │   │   │   ├──/SuperAdminProfile
│   │   │   │   │  ├── SuperAdminProfile.css
│   │   │   │   │  └── SuperAdminProfile.js
│   │   │   │   ├──/TicketDetails
│   │   │   │   │  ├── TicketDetails.css
│   │   │   │   │  └── TicketDetails.js
│   │   │   │   ├──/Tickets
│   │   │   │   │  ├── Tickets.css
│   │   │   │   │  └── Tickets.js
│   │   │   │   ├──/ViewTicketDetails
│   │   │   │   │  ├── ViewTicketDetails.css
│   │   │   │   │  └── ViewTicketDetails.js
│   │   │   │   ├── SuperAdminDashboard.css
│   │   │   │   └── SuperAdminDashboardRes.js
│   │   │   │   └── SuperAdminDashboard.js
│   │   │   ├── /Auth
│   │   │   │   ├── Login.js
│   │   │   │   ├── Login.css
│   │   │   │   ├── ForgotPassword.css
│   │   │   │   ├── ForgotPassword.js
│   │   │   │   ├── Login.png
│   │   │   │   └── 4957136_Mobile login.svg
│   │   ├── /firebase
│   │   │   └── firebaseConfig.js
│   │   ├── App.js
│   │   ├── Routes.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── jsconfig.json
│   ├── package-lock.json
│   └── package.json
│
├── /server (Node.js Backend)
│   ├── /Assets
│   ├── /node_modules
│   ├── /utils
│   │   └── generateJwtToken.js
│   ├── /routes
│   │   ├── adminRoutes.js
│   │   ├── userRoutes.js
│   │   └── superAdminRoutes.js
│   ├── /config
│   │   ├── firebaseAdmin.js
│   │   └── ticket-raiser-a3891-firebase-adminsdk-ruv27-463c3e36e6.json
│   ├── /middleware
│   │   └── authMiddleware.js
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│   
├── .gitignore
└── README.md