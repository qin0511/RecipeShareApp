const { MongoClient, ObjectId } = require("mongodb");

function MyDB() {
  const myDB = {};

  const url = process.env.MONGO_URL;
  const DB_NAME = "recipesApp";

  // creat users info
  myDB.creatUser = async (user) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true }); //connect to mogoClient
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const res = await client
        .db(DB_NAME)
        .collection("usersinfo")
        .insertOne(user);
      console.log("Inserted", res);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  // search user info
  myDB.searchUser = async (query) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true }); //connect to mogoClient
      console.log("Connecting to the db");
      await client.connect(); // establish a connection to the server
      console.log("Connected!");
      const db = client.db(DB_NAME); //select specific database
      const usersCol = db.collection("usersinfo"); //get the collection

      console.log("Collection ready, querying with ", query);
      const users = await usersCol.find(query).toArray(); //get users in the collection
      console.log("Got users", users);

      return users;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.getRecipes = async (query = {}, maxRecords = 50) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      console.log("Running query", query);
      return await client
        .db(DB_NAME)
        .collection("recipes")
        .find(query)
        .limit(maxRecords)
        .toArray();
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  // create recipe
  myDB.createRecipe = async (recipe) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const res = await client
        .db(DB_NAME)
        .collection("recipes")
        .insertOne(recipe);
      return res;
    } finally {
      client.close();
    }
  };

  // create comment
  myDB.writeComment = async (recipeId, comment, username) => {
    console.log(recipeId, comment);
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const res = await client
        .db(DB_NAME)
        .collection("recipes")
        .updateOne(
          { _id: new ObjectId(recipeId) },
          { $push: { comments: { comment_body: comment, username: username } } }
        );
      return res;
    } finally {
      client.close();
    }
  };

  return myDB;
}

module.exports = MyDB();
