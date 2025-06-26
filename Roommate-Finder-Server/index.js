const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_name}:${process.env.DB_Pass}@cluster0.odubfg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const roommateCollection = client.db(process.env.DB_name).collection("add");

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    // all listing
    app.get("/", (req, res) => {
      res.send("I'm live");
    });
    // all listing
    app.get("/browse_listing", async (req, res) => {
      const result = await roommateCollection.find().toArray();
      res.send(result);
    });

    // get 6 available roommates
    app.get("/available-roommates", async (req, res) => {
      const result = await roommateCollection
        .find({ availability: { $in: [true, "on"] } })
        .sort({ likes: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    // individual id showing
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roommateCollection.findOne(query);
      res.send(result);
    }); // filtered by email/user
    app.get("/browse_listing/:email", async (req, res) => {
      const userEmail = req.params.email;
      const result = await roommateCollection
        .find({ email: userEmail })
        .toArray();
      res.send(result);
    });

    // add a post
    app.post("/add", async (req, res) => {
      const newRoommate = req.body;
      const result = await roommateCollection.insertOne({
        ...newRoommate,
        likes: 0,
      });
      res.send(result);
    }); // you can like post
    app.put("/like/:id", async (req, res) => {
      const id = req.params.id;
      const { userEmail } = req.body;

      // First check if this is the user's own post
      const listing = await roommateCollection.findOne({
        _id: new ObjectId(id),
      });

      if (listing.email === userEmail) {
        res.send({ success: false, message: "Cannot like your own post" });
        return;
      }

      // If not liked, update the likes count and add user to likedBy array
      const filter = { _id: new ObjectId(id) };
      const update = {
        $inc: { likes: 1 },
        $push: { likedBy: userEmail },
      };
      const result = await roommateCollection.updateOne(filter, update);
      res.send({
        success: result.modifiedCount > 0,
        message:
          result.modifiedCount > 0
            ? "Like added successfully"
            : "Failed to like",
        ...result,
      });
    });

    // update a post
    app.put("/update-listing/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: req.body,
      };
      const result = await roommateCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Delete listing endpoint
    app.delete("/delete-listing/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await roommateCollection.deleteOne(query);
      res.send(result);
    });
  } catch {
    console.log("could not connect");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// =======================================
