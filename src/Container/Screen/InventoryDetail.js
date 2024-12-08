import React, { useEffect, useState } from "react";

const InventoryDetail = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy inventory data for Laptop and Charger only
    const dummyData = [
      {
        name: "Laptop",
        model: "Dell XPS 13",
        serialNumber: "XPS123456",
        image: "https://via.placeholder.com/150?text=Laptop",
        assignedDate: "2024-12-01",
      },
      {
        name: "Charger",
        model: "Dell 65W",
        serialNumber: "CHG654321",
        image: "https://via.placeholder.com/150?text=Charger",
        assignedDate: "2024-11-15",
      },
    ];

    // Simulate fetching data
    setTimeout(() => {
      setInventoryItems(dummyData);
      setLoading(false);
    }, 1000); // Simulating a 1-second delay for loading
  }, []);

  // Fallback image URL or default placeholder
  const getImageUrl = (imageUrl) => {
    return imageUrl ? imageUrl : "https://via.placeholder.com/150?text=No+Image"; // Default placeholder image
  };

  return (
    <div className="container mx-auto py-10">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Employee Inventory Details</h2>
        <p className="text-gray-600">Assigned devices for the employee</p>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600">Loading inventory data...</p>}

      {/* Inventory Cards */}
      {!loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {inventoryItems.length === 0 ? (
            <p className="text-center text-gray-600">No inventory data found</p>
          ) : (
            inventoryItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Conditional Image Rendering */}
                <img
                  src={getImageUrl(item.image)} // Fetch image or show fallback
                  alt={item.name}
                  className="w-40 h-40 mx-auto object-cover rounded-full mb-4"
                  onError={(e) => e.target.src = "https://via.placeholder.com/150?text=No+Image"} // Fallback on image load error
                />
                <h3 className="text-2xl font-medium text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm">Model: {item.model}</p>
                <p className="text-gray-600 text-sm">Serial No: {item.serialNumber}</p>
                <p className="text-gray-500 text-sm mb-4">Assigned Date: {item.assignedDate}</p>

                {/* Button to show more details */}
                <button
                  className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-all duration-300"
                  onClick={() => alert(`More details for ${item.name}`)}
                >
                  More Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default InventoryDetail;

//connect Network 



// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import axios for API calls

// const InventoryDetail = () => {
//   const [inventoryItems, setInventoryItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInventoryData = async () => {
//       try {
//         // Replace with your API endpoint
//         const response = await axios.get("https://your-api-endpoint.com/inventory");
        
//         // Assuming the response has an array of inventory items
//         setInventoryItems(response.data);
//       } catch (error) {
//         console.error("Error fetching inventory data:", error);
//         setInventoryItems([]); // Set empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInventoryData();
//   }, []);

//   // Fallback image URL or default placeholder
//   const getImageUrl = (imageUrl) => {
//     return imageUrl ? imageUrl : "https://via.placeholder.com/150?text=No+Image"; // Default placeholder image
//   };

//   return (
//     <div className="container mx-auto py-10">
//       {/* Title */}
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-semibold text-gray-800">Employee Inventory Details</h2>
//         <p className="text-gray-600">Assigned devices for the employee</p>
//       </div>

//       {/* Loading State */}
//       {loading && <p className="text-center text-gray-600">Loading inventory data...</p>}

//       {/* Inventory Cards */}
//       {!loading && (
//         <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
//           {inventoryItems.length === 0 ? (
//             <p className="text-center text-gray-600">No inventory data found</p>
//           ) : (
//             inventoryItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-xl rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
//               >
//                 {/* Conditional Image Rendering */}
//                 <img
//                   src={getImageUrl(item.image)} // Fetch image or show fallback
//                   alt={item.name}
//                   className="w-40 h-40 mx-auto object-cover rounded-full mb-4"
//                   onError={(e) => e.target.src = "https://via.placeholder.com/150?text=No+Image"} // Fallback on image load error
//                 />
//                 <h3 className="text-2xl font-medium text-gray-800 mb-2">{item.name}</h3>
//                 <p className="text-gray-600 text-sm">Model: {item.model}</p>
//                 <p className="text-gray-600 text-sm">Serial No: {item.serialNumber}</p>
//                 <p className="text-gray-500 text-sm mb-4">Assigned Date: {item.assignedDate}</p>

//                 {/* Button to show more details */}
//                 <button
//                   className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-all duration-300"
//                   onClick={() => alert(`More details for ${item.name}`)}
//                 >
//                   More Details
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InventoryDetail;
