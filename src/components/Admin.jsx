import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./Firebase"; // Ensure this is correctly imported

const Admin = ({ onLogout }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", image: null });
  const [previewImage, setPreviewImage] = useState(null);
  const [editItem, setEditItem] = useState(null); // To handle editing

  // Fetch food items from Firebase on component mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foodItems"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodItems(items);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems(); // Fetch food items
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle file input change (for preview only)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file); // Convert the file to base64 for preview
    }
  };

  // Add a new food item (name & price only to Firebase)
  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      try {
        console.log("Adding item to Firebase...");
        const docRef = await addDoc(collection(db, "foodItems"), {
          name: newItem.name,
          price: newItem.price,
        });
        console.log("Document written with ID:", docRef.id);

        setFoodItems([
          ...foodItems,
          { ...newItem, id: docRef.id, image: previewImage },
        ]);

        // Clear inputs
        setNewItem({ name: "", price: "", image: null });
        setPreviewImage(null);
        alert("Food item added successfully!");
      } catch (error) {
        console.error("Error adding document:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Start editing an item
  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem({ name: item.name, price: item.price });
    setPreviewImage(item.image); // Show the current image preview
  };

  // Save the edited food item
  const handleSaveEdit = async () => {
    if (editItem && newItem.name && newItem.price) {
      try {
        const foodRef = doc(db, "foodItems", editItem.id);
        await updateDoc(foodRef, {
          name: newItem.name,
          price: newItem.price,
        });

        // Update the state with the new data
        setFoodItems(
          foodItems.map((item) =>
            item.id === editItem.id ? { ...item, ...newItem, image: previewImage } : item
          )
        );

        setEditItem(null); // Reset editing mode
        setNewItem({ name: "", price: "", image: null });
        setPreviewImage(null);
        alert("Food item updated successfully!");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete a food item
  const handleDelete = async (id) => {
    try {
      const foodRef = doc(db, "foodItems", id);
      await deleteDoc(foodRef);

      // Remove from the local state as well
      setFoodItems(foodItems.filter(item => item.id !== id));
      alert("Food item deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Add or Edit Food Item Form */}
      <div className="bg-white p-5 shadow-md rounded-md mb-5">
        <h2 className="text-lg font-bold mb-3">{editItem ? "Edit Food Item" : "Add Food Item"}</h2>
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newItem.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mt-2"
            />
          )}
          <button
            onClick={editItem ? handleSaveEdit : handleAddItem}
            className="px-4 py-2 bg-orange-600 text-white rounded shadow-md hover:bg-orange-500 transition-all"
          >
            {editItem ? "Save Changes" : "Add Item"}
          </button>
        </div>
      </div>

      {/* Food Items List */}
      <div>
        <h2 className="text-lg font-bold mb-3">Food Items</h2>
        {foodItems.length === 0 ? (
          <p className="text-gray-500">No food items added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {foodItems.map((item) => (
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
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
