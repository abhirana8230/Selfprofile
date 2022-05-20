const { MongoClient } = require("mongodb");

//importing from config file
const mongodbURL = process.env.DATABASE; //once path mentioned in app.js so no need to do again and again

const dbName = "Registration";
const client = new MongoClient(mongodbURL);

const mongo = {
  db: null,

  async connect() {
    try {
      await client.connect(); //connecting to db
      this.db = client.db(dbName);
      console.log("mongodb connected");
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = mongo;
