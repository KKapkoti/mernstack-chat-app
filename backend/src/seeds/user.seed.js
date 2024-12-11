// import { config } from "dotenv";
// import { connectDB } from "../lib/db.js";
// import User from "../models/user.model.js";

// config();

// const seedUsers = [
//   // Female Users
//   {
//     email: "emma@example.com",
//     fullName: "Emma",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
//   },
//   {
//     email: "olivia@example.com",
//     fullName: "Olivia Miller",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   {
//     email: "sophia@example.com",
//     fullName: "Sophia Davis",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
//   },
//   {
//     email: "mary@example.com",
//     fullName: "mary Wilson",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
//   {
//     email: "lisa@example.com",
//     fullName: "lisa",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
//   },
//   {
//     email: "mia.johnson@example.com",
//     fullName: "Mia Johnson",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
//   },
//   {
//     email: "charlotte.williams@example.com",
//     fullName: "Charlotte Williams",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
//   },
//   {
//     email: "amelia.garcia@example.com",
//     fullName: "Amelia Garcia",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
//   },

//   // Male Users
//   {
//     email: "james@example.com",
//     fullName: "James Anderson",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     email: "william@example.com",
//     fullName: "William Clark",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
//   },
//   {
//     email: "henry@example.com",
//     fullName: "Henry Jackson",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
//   {
//     email: "alexander@example.com",
//     fullName: "Alexander Martin",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
//   },
//   {
//     email: "daniel@example.com",
//     fullName: "Daniel Rodriguez",
//     password: "123456",
//     profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
//   },
// ];

// const seedDatabase = async () => {
//   try {
//     await connectDB();

//     await User.insertMany(seedUsers);
//     console.log("Database seeded successfully");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   }
// };

// // Call the function
// seedDatabase();