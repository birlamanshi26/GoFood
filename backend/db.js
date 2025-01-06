const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://gofood:26septM%40NSI@cluster0.m5khq.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // Fetch data from the "food_items" collection
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

    // Fetch food items
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

// To test the connection, you can run the following script:
if (require.main === module) {
  connectDB();
}
