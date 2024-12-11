//message.controller.js
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


//for sidebars
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//get mgs between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    // const { text, attachments = [] } = req.body;
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });




/////updated//////////////////////////////////////////////////////////////////////////////////////
    // let uploadedAttachments = [];
    // // if (attachments && attachments.length > 0) {
    //   // Upload each attachment to cloudinary
    //   for (const file of attachments) {
    //     // const uploadResponse = await cloudinary.uploader.upload(file, {
    //       const uploadResponse = await cloudinary.uploader.upload(file.fileUrl, {
    //       resource_type: "auto", // Automatically detect file type (image, video, document, etc.)
    //     });

    //     uploadedAttachments.push({
    //       // filename: uploadResponse.original_filename,
    //       // fileType: uploadResponse.resource_type,
    //       // fileUrl: uploadResponse.secure_url,
    //       filename: file.filename,
    //     fileType: file.fileType,
    //     fileUrl: uploadResponse.secure_url,
    //     });
    //   }
    // }

    // const newMessage = new Message({
    //   senderId,
    //   receiverId,
    //   text,
    //   attachments: uploadedAttachments,
    // });

//////////////////////////////////////////////////////////////////


    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};