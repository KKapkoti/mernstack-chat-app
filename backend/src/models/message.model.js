//message.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    

    //addd
    // text: {
    //   type: String,
    // },
    // attachments: [
    //   {
    //     filename: { type: String, required: true }, // File name
    //     fileType: { type: String, required: true }, // e.g., 'image/png', 'application/pdf'
    //     fileUrl: { type: String, required: true },  // URL or path to the stored file
    //   },
    // ],
  },
  { timestamps: true }
);












//   },
//   { timestamps: true }
// );

const Message = mongoose.model("Message", messageSchema);

export default Message;