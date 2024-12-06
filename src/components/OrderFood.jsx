import React, { useState, useEffect } from "react";
import { collection,doc, getDocs,getDoc } from "firebase/firestore";
import { db ,auth} from "./Firebase";
import { FaShoppingCart } from "react-icons/fa";
import { BiUser } from "react-icons/bi"

const OrderFood = ({ user }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);

// userdata
const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //   console.log("Current user:", user)/;
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
        //   console.log("Trying to fetch document with UID:", user.uid);  
  
          const docSnap = await getDoc(docRef);
        //   console.log("Document snapshot:", docSnap);
  
          if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("User data fetched successfully:", userData);
  
            if (userData.username) {
              setUserData(userData); 
            } else {
              console.log("No username found in Firestore, using displayName or fallback");
              setUserData({ username: user.displayName || 'Default Username', email: user.email });
            }
          } else {
            console.log("No such document exists for UID:", user.uid);
            setUserData({ username: user.displayName || 'Default Username', email: user.email }); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No user is logged in");
      }
      setLoading(false); 
    });
  
    return () => unsubscribe(); 
  }, []);
  
   

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foodItems"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.name} added to the cart!`);
  };

  const handleBuyNow = (item) => {
    alert(`Proceeding to buy ${item.name}...`);
    alert(`Your Bill is  ${item.price}`);
  };

  const handleCompletePurchase = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to your cart before purchasing!");
      return;
    }
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    const billSummary = `
      Bill Summary:
      --------------
      Items:
      ${cart.map(item => `- ${item.name}: $${item.price}`).join("\n")}
      
      Total Amount: $${totalAmount}
      
      Thank you for your purchase!
    `;
    alert(billSummary);

    setCart([]);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-5" style={{ paddingTop: "100px" }}>
      {/* User Profile */}
      <div className="bg-white p-5 shadow-md rounded-md mb-5">
        <h1 className="text-2xl font-bold mb-3">User Profile</h1>
        <div className="flex items-center space-x-4">
          <BiUser className="text-orange-500 text-2xl" />
          <div>
            {userData ? (
              <>
                <p className="text-lg font-bold">{userData.username}</p>
                <p className="text-gray-500">{userData.email}</p>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Order Food</h2>
        <div className="relative">
          <FaShoppingCart className="text-3xl text-orange-500 cursor-pointer" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-sm font-bold rounded-full px-2 py-1">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Food Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {foodItems.length === 0 ? (
          <p className="text-gray-500">No food items available.</p>
        ) : (
          foodItems.map((item) => (
            <div key={item.id} className="bg-white p-5 shadow-md rounded-md">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-500">${item.price}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => handleBuyNow(item)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-5 shadow-md rounded-md mt-5">
        <h2 className="text-lg font-bold mb-3">Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <p className="text-gray-700">{item.name}</p>
                  <p className="text-gray-500">${item.price}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <p className="text-lg font-bold">
                Total: $
                {cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}
              </p>
              <button
                onClick={handleCompletePurchase}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition-all"
              >
                Complete Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderFood;
