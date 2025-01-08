const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://gofood:26septM%40NSI@cluster0.m5khq.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // Access the database directly
    const db = mongoose.connection.db;

    // Fetch data from the "food_items" and "foodCategory" collections
    const foodItemsCollection = db.collection("food_items");
    const foodCategoryCollection = db.collection("foodCategory");

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    // Assign data to global variables
    global.food_items = foodItems;
    global.foodCategory = foodCategories;

    console.log("Data fetched and assigned to global variables");
  } catch (error) {
    console.error("Error connecting to MongoDB or fetching data:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;

// Test the connection when running this file directly
if (require.main === module) {
  connectDB()
    .then(() => {
      console.log("Database connection test successful");
      process.exit(0); // Exit the process with success
    })
    .catch((error) => {
      console.error("Database connection test failed:", error.message);
      process.exit(1); // Exit the process with failure
    });
}
