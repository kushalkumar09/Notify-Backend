const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("../api/db.js");
// const createUser = require("./controllers/user.controller.js");
// const login = require("./controllers/login.controller.js");
// // const User = require("../api/models/user.model.js")

require("dotenv").config();
//middleware
app.use(express.json());
app.use(cors({credentials:true, origin: "http://localhost:3000"}));

const PORT = process.env.PORT || 4000;

//dbconnection
dbConnect();

//mount routes
app.use("/api/v1", require("./routes/route.js"))

// app.use("/api/v1/createuser", createUser);
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   res.json(user);
// })

  app.listen(4000, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
