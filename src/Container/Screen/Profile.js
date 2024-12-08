import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    gender: "Male",
    dob: "",
    address: "",
    profilePhoto: null,
    role: "Software Developer",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifscCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePhoto: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
      <div className="flex items-center mb-6">
        {/* Profile Image */}
        <div>
          {formData.profilePhoto ? (
            <img
              src={formData.profilePhoto}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mt-2 block text-sm border p-2 w-28 "
          />
        </div>
        {/* Role */}
        <div className="ml-6 mb-12">
          <p className="text-xl font-semibold">{formData.role}</p>
          <p className="text-gray-600">Position</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className="w-full border rounded p-2"
              placeholder="Enter father's name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows="3"
            placeholder="Enter your address"
          ></textarea>
        </div>

        {/* Bank Account Details */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Bank Account Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter your account number"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter your bank name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Branch && Address</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter your branch name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full border rounded p-2"
                placeholder="Enter your IFSC code"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;




//for connect with network ///


// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios for API requests
// import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     fatherName: "",
//     gender: "Male",
//     dob: "",
//     address: "",
//     profilePhoto: null,
//     role: "Software Developer",
//     accountNumber: "",
//     bankName: "",
//     branch: "",
//     ifscCode: "",
//   });

//   const [isLoading, setIsLoading] = useState(false); // Loader state
//   const [error, setError] = useState(null);

//   // Fetch existing profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get("https://api.example.com/profile");
//         setFormData(response.data);
//       } catch (err) {
//         setError("Failed to fetch profile data.");
//         toast.error("Failed to fetch profile data."); // Show error toast
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       profilePhoto: URL.createObjectURL(e.target.files[0]),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true); // Start loader when submitting

//     try {
//       // Send form data to the API
//       await axios.put("https://api.example.com/profile", formData);
//       toast.success("Profile updated successfully!"); // Success toast
//     } catch (err) {
//       toast.error("Failed to update profile."); // Error toast
//     } finally {
//       setIsLoading(false); // Stop loader after submit
//     }
//   };

//   if (isLoading) {
//     return <div className="loader">Loading...</div>; // Loading Spinner
//   }

//   return (
//     <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
//       <div className="flex items-center mb-6">
//         {/* Profile Image */}
//         <div>
//           {formData.profilePhoto ? (
//             <img
//               src={formData.profilePhoto}
//               alt="Profile"
//               className="w-24 h-24 rounded-full object-cover border"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoUpload}
//             className="mt-2 block text-sm border p-2 w-28"
//           />
//         </div>
//         {/* Role */}
//         <div className="ml-6 mb-12">
//           <p className="text-xl font-semibold">{formData.role}</p>
//           <p className="text-gray-600">Position</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Personal Details */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block mb-2 font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               placeholder="Enter your name"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Father's Name</label>
//             <input
//               type="text"
//               name="fatherName"
//               value={formData.fatherName}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               placeholder="Enter father's name"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Gender</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">Date of Birth</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="w-full border rounded p-2"
//               required
//             />
//           </div>
//         </div>

//         {/* Address */}
//         <div className="mb-6">
//           <label className="block mb-2 font-medium">Address</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//             rows="3"
//             placeholder="Enter your address"
//           ></textarea>
//         </div>

//         {/* Bank Account Details */}
//         <div className="mb-6">
//           <h3 className="text-2xl font-semibold mb-4">Bank Account Details</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2 font-medium">Account Number</label>
//               <input
//                 type="text"
//                 name="accountNumber"
//                 value={formData.accountNumber}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 placeholder="Enter your account number"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">Bank Name</label>
//               <input
//                 type="text"
//                 name="bankName"
//                 value={formData.bankName}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 placeholder="Enter your bank name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">Branch & Address</label>
//               <input
//                 type="text"
//                 name="branch"
//                 value={formData.branch}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 placeholder="Enter your branch name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 font-medium">IFSC Code</label>
//               <input
//                 type="text"
//                 name="ifscCode"
//                 value={formData.ifscCode}
//                 onChange={handleChange}
//                 className="w-full border rounded p-2"
//                 placeholder="Enter your IFSC code"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? "Updating..." : "Update Profile"} {/* Button Text Update */}
//         </button>
//       </form>

//       <ToastContainer /> {/* Toast notifications */}
//     </div>
//   );
// };

// export default Profile;

