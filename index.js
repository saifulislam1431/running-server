const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8cnv71c.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());







// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const allShoesCollection = client.db("running").collection("allShoes");
    const topCollection = client.db("running").collection("top");
    const reviewCollection = client.db("running").collection("reviews")
    const cartCollection = client.db("running").collection("cart")
    const userCollection = client.db("running").collection("users")

    // User Collection
    app.post("/all-users", async (req, res) => {
      const userData = req.body;
      const email = userData.email;
      const existingUser = await userCollection.findOne({ email: email })
      if (existingUser) {
        return res.json("User Exist")
      }
      const result = await userCollection.insertOne(userData)
      res.send(result);
    })

    app.get("/all-users", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result)
    })

    app.patch("/all-users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateUser = {
        $set: {
          role: "admin"
        }
      }
      const result = await userCollection.updateOne(filter, updateUser)
      res.send(result)
    })

    app.get("/all-users/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result)
    })


    //All Shoe API
    app.get("/all-shoes", async (req, res) => {
      const result = await allShoesCollection.find({}).toArray();
      res.send(result)
    })

    // Add Shoe Cart
    app.post("/user-cart", async (req, res) => {
      const addData = req.body;
      const result = await cartCollection.insertOne(addData);
      res.send(result)
    })

    app.get("/user-cart", async (req, res) => {
      const query = req.query.Email;
      const result = await cartCollection.find({ Email: query }).toArray()
      res.send(result)
    })





    // Review API
    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find({}).toArray();
      res.send(result)
    })




    //Top Shoes API
    app.get("/top-brand", async (req, res) => {
      const result = await topCollection.find({}).toArray();
      res.send(result)
    })








    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Server successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get("/", (req, res) => {
  res.send("This is Running's server")
})

app.listen(port, () => {
  console.log(`This server is running at port ${port}`);
})