const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const bcrypt = require("bcrypt");

// URL to the MongoDB database
const url = "mongodb://localhost:27017/clothing-store";

// Salt rounds for hashing passwords
const saltRounds = 10;

// Function to create a new user account
const createUser = async (username, password, isAdmin) => {
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db();

    // Hash the password using bcrypt
    const hash = await bcrypt.hash(password, saltRounds);

    // Create the user object
    const user = {
      username: username,
      password: hash,
      isAdmin: isAdmin,
    };

    // Insert the user into the users collection
    await db.collection("users").insertOne(user);

    // Close the database connection
    client.close();
  } catch (err) {
    console.error(err);
  }
};

// Function to login with a username and password
const login = async (username, password) => {
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db();

    // Query the users collection to find the user with the given username
    const user = await db
      .collection("users")
      .findOne({ username: username });

    // If no user with the given username was found, return null
    if (!user) {
      return null;
    }

    // Compare the given password with the hashed password in the database
    const isValid = await bcrypt.compare(password, user.password);

    // Close the database connection
    client.close();

    // If the password is valid, return the user object. Otherwise, return null.
    return isValid ? user : null;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createUser,
  login,
};
