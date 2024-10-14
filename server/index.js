// import { createServer } from 'http';

// const server = createServer((req, res)=>{

// });

// server.listen(3000, ()=>console.log("Listening to port 3000"));

// import express from "express";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();
// app.use(cors());
// app.use(express.json()); // Use express.json() middleware

// app.use("/clients", authRoutes);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // Use ES module syntax with import

const app = express();
app.use(cors());
app.use(express.json()); // Use express.json() middleware

app.use("/clients", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
