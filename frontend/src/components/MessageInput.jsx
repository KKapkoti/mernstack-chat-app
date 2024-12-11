import { useRef, useState } from "react";

import { useChatStore } from "../store/useChatStore";
// import { Image, Send, X, File } from "lucide-react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
       {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
             <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
         <div className="flex-1 flex gap-2">
           <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

           <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
         </div>
         <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;


























// import { useRef, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
// import { Image, Send, X, File } from "lucide-react";
// import toast from "react-hot-toast";

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// const MessageInput = () => {
//   const [text, setText] = useState("");
//   const [filePreviews, setFilePreviews] = useState([]);
//   const fileInputRef = useRef(null);
//   const { sendMessage } = useChatStore();
  
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = [];

//     files.forEach((file) => {
//       if (file.size > MAX_FILE_SIZE) {
//         toast.error(`${file.name} is too large. Max size is 5MB.`);
//         return;
//       }

//       if (!file.type.startsWith("image/") && !file.type.startsWith("application/")) {
//         toast.error(`${file.name} is an unsupported file type.`);
//         // toast.error("Unsupported file type. Only images and documents are allowed.");
//         return;
//       }

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         validFiles.push({
//           name: file.name,
//           type: file.type,
//           preview: reader.result, // Base64 preview for files
//         });

//         // Update previews after processing all files
//         if (validFiles.length === files.length) {
//           setFilePreviews((prev) => [...prev, ...validFiles]);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeFile = (index) => {
//     setFilePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && filePreviews.length === 0) return;

//     try {
//       // await sendMessage({
//       //   text: text.trim(),
//       //   attachments: filePreviews.map((file) => file.preview),
//       //   filename: file.name,//add
//       //   fileType: file.type,//add
//       //   fileUrl: file.preview, // Base64 data//add
//       // });



//       ////addd
//       await sendMessage({
//         text: text.trim(),
//         attachments: filePreviews.map((file) => ({
//           filename: file.name,
//           fileType: file.type,
//           fileUrl: file.preview, // Base64 data
//         })),
//       });



//       //////////

//       // Clear form
//       setText("");
//       setFilePreviews([]);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   return (
//     <div className="p-4 w-full">
//       {filePreviews.length > 0 && (
//         <div className="mb-3 flex flex-wrap gap-3">
//           {filePreviews.map((file, index) => (
//             <div key={index} className="relative flex items-center gap-2 border p-2 rounded-lg">
//               {file.type.startsWith("image/") ? (
//                 <img
//                   src={file.preview}
//                   alt={file.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//               ) : (
//                 <div className="flex items-center">
//                   <File size={20} className="mr-2" />
//                   <span className="text-sm">{file.name}</span>
//                 </div>
//               )}
//               <button
//                 onClick={() => removeFile(index)}
//                 className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
//                 flex items-center justify-center"
//                 type="button"
//               >
//                 <X size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <div className="flex-1 flex gap-2">
//           <input
//             type="text"
//             className="w-full input input-bordered rounded-lg input-sm sm:input-md"
//             placeholder="Type a message..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           />
//           <input
//             type="file"
//             multiple
//             accept="image/*,application/pdf,application/msword"
//             className="hidden"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//           />

//           <button
//             type="button"
//             className={`hidden sm:flex btn btn-circle
//                      ${filePreviews.length > 0 ? "text-emerald-500" : "text-zinc-400"}`}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <Image size={20} />
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-sm btn-circle"
//           disabled={!text.trim() && filePreviews.length === 0}
//         >
//           <Send size={22} />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;
