const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// URL to the MongoDB database
const url = "mongodb://localhost:27017/clothing-store";

// Function to scan a barcode and return the corresponding item information
const scanBarcode = async (barcode) => {
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db();

    // Query the items collection to find the item with the given barcode
    const result = await db
      .collection("items")
      .findOne({ barcode: barcode });

    // Close the database connection
    client.close();

    // Return the item information
    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  scanBarcode,
};
