const express = require("express");
const basic_routes = require("./router/basic_router");
const player_entry_router = require("./router/player_entry_router");
const db_connect = require("./db/connect");
const cors = require("cors");
const http = require("http");
const { initialize_socket_server } = require("./socket");

require("dotenv").config();

const app = express();
const server = new http.createServer(app);
const io = initialize_socket_server(server);
app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    // origin: "https://keyblitz.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api", basic_routes);
app.use("/inset_player_data", player_entry_router);

server.listen(3000, () => {
  console.log("the server is listening at port 3000");
  db_connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("mongodb connected succesfully");
    })
    .catch(() => {
      console.log("there was an error connecting to database");
    });
});
