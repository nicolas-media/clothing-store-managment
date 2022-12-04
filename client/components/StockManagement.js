import React, { useState, useEffect } from "react";
import axios from "axios";

const StockManagement = () => {
  const [items, setItems] = useState(null); // State for the list of items in the stock
  const [itemId, setItemId] = useState(""); // State for the selected item ID
  const [quantity, setQuantity] = useState(0); // State for the quantity to add or remove

  // Load the list of items in the stock when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      // Send a request to the server to get the list of items in the stock
      const result = await axios.get("/stock");
      setItems(result.data);
    };
    fetchItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // If the quantity is positive, add items to the stock. Otherwise, remove items from the stock.
    if (quantity > 0) {
      // Send a request to the server to add items to the stock
      await axios.post("/add-to-stock", {
        itemId: itemId,
        quantity: quantity,
      });
    } else {
      // Send a request to the server to remove items from the stock
      await axios.post("/remove-from-stock", {
        itemId: itemId,
        quantity: -quantity,
      });
    }

    // Reload the list of items in the stock
    const result = await axios.get("/stock");
    setItems(result.data);
  };

  return (
    <div>
      {/* Form for adding or removing items from the stock */}
      <form onSubmit={handleSubmit}>
        {/* Select box for choosing the item */}
        <select value={itemId} onChange={(event) => setItemId(event.target.value)}>
          {items &&
            items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>

        {/* Input field for the quantity */}
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>

      {/* List of items in the stock */}
      <ul>
        {items &&
          items.map((item) => (
            <li key={item._id}>
              {item.name}: {item.stock}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StockManagement;
