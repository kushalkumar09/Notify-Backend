const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.DB_URL}`);

    console.log(`MongoDb connected: ${connect.connection.host}`);
  } catch (err) {
    console.log("Error in Connection ", err);
    process.exit(1);
  }
};

module.exports = dbConnect;
