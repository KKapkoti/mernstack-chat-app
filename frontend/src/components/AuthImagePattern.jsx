// const AuthImagePattern = ({ title, subtitle }) => {
//     return (
//       <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//         <div className="max-w-md text-center">
//           <div className="grid grid-cols-3 gap-5 mb-8">
//             {[...Array(1)].map((_, i) => (
//               <div
//                 key={i}      
//                 className={`w-32 h-32  rounded-2xl bg-primary/10 ${
//                   i % 2 === 0 ? "animate-pulse" : ""
//                 }`}
//               >
//                 <img
//                   src="/authimage.jpeg" 
//                   alt="Auth Image"
//                   className="w-full h-full rounded-lg shadow-md"
//                 />
//               </div>
//             ))}
//           </div>
      
//           <h2 className="text-2xl font-bold mb-4">{title}</h2>
//           <p className="text-base-content/60">{subtitle}</p>
//         </div>
//       </div>
//     );
//   };
  
//   export default AuthImagePattern;


  const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="flex justify-center mb-8">
            <div className="w-85 h-100 rounded-2xl bg-primary/10 animate-pulse relative">
              <img
                src="/authimage.jpeg" // Update the path to your image's location
                alt="Auth Image"
                className="w-full  rounded-lg shadow-md object-cover"
              />
            </div>
          </div>
  
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  


  