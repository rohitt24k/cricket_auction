const express = require("express");
const basic_routes = require("./router/basic_router");
const db_connect = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", basic_routes);

app.listen(3000, () => {
  console.log("the server is listening at port 3000");
  db_connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("mongodb connected succesfully");
    })
    .catch(() => {
      console.log("there was an error connecting to database");
    });
});
