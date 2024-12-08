import React, { useState } from "react";

const Documents = () => {
  const documents = [
    { name: "Aadhaar Card", fileType: "PDF", url: "#" },
    { name: "PAN Card", fileType: "PDF", url: "#" },
    { name: "Education Certificate", fileType: "PDF", url: "#" },
    { name: "Offer Letter", fileType: "PDF", url: "#" },
    { name: "Experience Letter", fileType: "PDF", url: "#" },
    { name: "Other Document", fileType: "PDF", url: "#" },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
        Documents
      </h1>

      {/* Document Upload Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-8">
        <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-4">
          Upload a New Document
        </h3>
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"
        />
        {selectedFile && (
          <div className="mt-4 text-green-600">
            <span>Selected file: {selectedFile.name}</span>
          </div>
        )}
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-4">
          Uploaded Documents
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition duration-300"
            >
              <h4 className="font-semibold text-lg text-gray-800">
                {doc.name}
              </h4>
              <p className="text-gray-600">File Type: {doc.fileType}</p>

              <div className="flex flex-wrap items-center mt-4 space-x-4">
                <a
                  href={doc.url}
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                <button
                  onClick={() => alert("Download Started!")}
                  className="text-green-600 hover:text-green-800"
                >
                  Download
                </button>
                {doc.fileType === "Image" && (
                  <a
                    href={doc.url}
                    className="text-purple-600 hover:text-purple-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;


//connect with Network



// import React, { useState, useEffect } from "react";
// import axios from "axios"; // For network requests
// import { ToastContainer, toast } from "react-toastify"; // For notifications
// import "react-toastify/dist/ReactToastify.css"; // For Toastify CSS

// const Documents = () => {
//   const [documents, setDocuments] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // For loading state
//   const [uploading, setUploading] = useState(false); // For file upload state

//   // Fetch existing documents from the network
//   useEffect(() => {
//     const fetchDocuments = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get("https://api.example.com/documents");
//         setDocuments(response.data);
//       } catch (error) {
//         toast.error("Failed to fetch documents.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, []);

//   // Handle file selection for upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   // Upload document to the server
//   const handleFileSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       toast.warning("Please select a file to upload.");
//       return;
//     }

//     setUploading(true); // Show loading spinner for upload
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const response = await axios.post("https://api.example.com/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Document uploaded successfully!");
//       setDocuments((prevDocs) => [...prevDocs, response.data]); // Add new document to the list
//       setSelectedFile(null); // Clear selected file
//     } catch (error) {
//       toast.error("Failed to upload document.");
//     } finally {
//       setUploading(false); // Stop loader after upload
//     }
//   };

//   // Loader component to show while fetching data
//   const Loader = () => (
//     <div className="text-center text-xl text-gray-600">Loading...</div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">Documents</h1>

//       {/* Document Upload Section */}
//       <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg mb-8">
//         <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-4">Upload a New Document</h3>

//         <form onSubmit={handleFileSubmit}>
//           <input
//             type="file"
//             onChange={handleFileUpload}
//             className="block w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"
//           />
//           {selectedFile && (
//             <div className="mt-4 text-green-600">
//               <span>Selected file: {selectedFile.name}</span>
//             </div>
//           )}

//           <button
//             type="submit"
//             className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             disabled={uploading} // Disable button during upload
//           >
//             {uploading ? "Uploading..." : "Upload Document"}
//           </button>
//         </form>
//       </div>

//       {/* Uploaded Documents List */}
//       <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
//         <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-4">Uploaded Documents</h3>

//         {isLoading ? (
//           <Loader /> // Show loader if data is being fetched
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//             {documents.map((doc, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-xl transition duration-300"
//               >
//                 <h4 className="font-semibold text-lg text-gray-800">{doc.name}</h4>
//                 <p className="text-gray-600">File Type: {doc.fileType}</p>

//                 <div className="flex flex-wrap items-center mt-4 space-x-4">
//                   <a
//                     href={doc.url}
//                     className="text-blue-600 hover:text-blue-800"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View
//                   </a>
//                   <button
//                     onClick={() => alert("Download Started!")}
//                     className="text-green-600 hover:text-green-800"
//                   >
//                     Download
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <ToastContainer /> {/* Toast notifications */}
//     </div>
//   );
// };

// export default Documents;
