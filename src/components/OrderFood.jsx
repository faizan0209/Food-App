// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./Firebase"; // Ensure this is correctly imported

// const OrderFood = ({ user }) => {
//   const [foodItems, setFoodItems] = useState([]);
//   const [cart, setCart] = useState([]);
  
//   // Fetch food items from Firebase on component mount
//   useEffect(() => {
//     const fetchFoodItems = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "foodItems"));
//         const items = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setFoodItems(items);
//       } catch (error) {
//         console.error("Error fetching food items:", error);
//       }
//     };

//     fetchFoodItems();
//   }, []);

//   // Add item to cart
//   const handleAddToCart = (item) => {
//     setCart((prevCart) => [...prevCart, item]);
//   };

//   // Direct Buy Now functionality (alert for demonstration)
//   const handleBuyNow = (item) => {
//     alert(`You bought ${item.name} for $${item.price}!`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <div className="text-xl font-bold">Order Food</div>
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <img
//               src={user?.profilePicture || "https://via.placeholder.com/40"}
//               alt="User"
//               className="w-10 h-10 rounded-full"
//             />
//             <span>{user?.name || "Guest"}</span>
//           </div>
//           <div className="relative">
//             <button className="relative">
//               <span className="material-icons text-2xl">shopping_cart</span>
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-1.5 py-0.5 rounded-full">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="p-5">
//         <h2 className="text-2xl font-bold mb-4">Available Food Items</h2>
//         {foodItems.length === 0 ? (
//           <p className="text-gray-500">No food items available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {foodItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-white shadow-md rounded-md p-4 flex flex-col items-center"
//               >
//                 {item.image && (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-40 object-cover rounded-md mb-3"
//                   />
//                 )}
//                 <h3 className="text-lg font-bold">{item.name}</h3>
//                 <p className="text-gray-500">${item.price}</p>
//                 <div className="mt-3 flex space-x-2">
//                   <button
//                     onClick={() => handleBuyNow(item)}
//                     className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
//                   >
//                     Buy Now
//                   </button>
//                   <button
//                     onClick={() => handleAddToCart(item)}
//                     className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-all"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderFood;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Using axios to fetch food items (can also use fetch API)

// API Endpoint to fetch food items
const API_URL = 'https://yourapi.com/food-items'; // Replace with actual API endpoint

const OrderFood = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [cartItems, setCartItems] = useState(0);

  // Fetch food items from the admin page
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setFoodItems(response.data); // Assuming the response is an array of food items
      })
      .catch((error) => {
        console.error('Error fetching food items:', error);
      });
  }, []);

  // Handle adding items to the cart
  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1>Food Delivery</h1>
          <p>We Deliver The Taste of Life</p>
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Food Name..."
            style={{ width: '250px' }}
          />
          <button className="btn btn-danger ms-2">Find Food</button>
        </div>
        <div>
          <Link to="/cart" className="position-relative">
            <i className="fas fa-shopping-cart fa-2x text-danger"></i>
            {cartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Food Category Section */}
      <h2>Browse Food Category</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item.id} className="col">
              <div className="card">
                <img src={item.imageUrl} alt={item.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">${item.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading food items...</p>
        )}
      </div>
    </div>
  );
};

export default OrderFood;
