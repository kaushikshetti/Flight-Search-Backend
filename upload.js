const fs = require("fs");
const { MongoClient } = require("mongodb");

// Replace with your MongoDB URI
const uri = "mongodb://localhost:27017"; // or MongoDB Atlas URI
const client = new MongoClient(uri);

async function uploadJson() {
  try {
    // Read JSON file
    const data = fs.readFileSync("UI_Assignment_Flight_Data.json", "utf8");
    const documents = JSON.parse(data); // or data.split('\n').map(JSON.parse) if line-delimited

    // Connect to MongoDB
    await client.connect();
    const db = client.db("flight"); // your DB name
    const collection = db.collection("flight"); // your collection name

    // Insert documents
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

uploadJson();
