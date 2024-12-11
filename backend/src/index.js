//index.js

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import multer from 'multer';////
// import upload from 'multer({dest:"uploads/"})';
import path from "path";

// const app = express();




import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();//deploment

app.use(express.json());
app.use(cookieParser());



//////
// // Increase the payload limit for JSON and form-data
// app.use(express.json({ limit: "100mb" })); // Adjust size as per your requirements
// app.use(express.urlencoded({ limit: "100mb", extended: true }));


// app.use((req, res, next) => {
//   console.log(`Payload size (Content-Length): ${req.headers['content-length']}`);
//   next();
// });


///////
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.send('File uploaded successfully!');
//     return res.redirect("/");
// });

// Increase the payload limit for JSON and form-data
// app.use(express.urlencoded({extended: false }));




////
// // Apply headers and CORS before defining routes
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   next();
// });
//////////


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers   //add
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow required HTTP methods     ///add
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);



//deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
/////





server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});




