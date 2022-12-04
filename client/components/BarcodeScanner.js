import React, { useState } from "react";
import axios from "axios";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState(""); // State for the barcode input
  const [item, setItem] = useState(null); // State for the item information

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a request to the server to scan the barcode
    const result = await axios.post("/scan-barcode", {
      barcode: barcode,
    });

    // Set the item information
    setItem(result.data);
  };

  return (
    <div>
      {/* Form for entering a barcode */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={barcode}
          onChange={(event) => setBarcode(event.target.value)}
        />
        <button type="submit">Scan</button>
      </form>

      {/* Display the item information, if it exists */}
      {item && (
        <div>
          <p>ID: {item._id}</p>
          <p>Name: {item.name}</p>
          <p>Price: {item.price}</p>
          <p>Stock: {item.stock}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
