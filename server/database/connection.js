const mongoose = require("mongoose");

const connectDB = async () => {
  //Properties will stop unwanted warnings in console
  try {
    const con = await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModified: false,
      useCreateIndex: true,
    });
    let host = con.connection.host;
    console.log("Mongodb connected", host);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
