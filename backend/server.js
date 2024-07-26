const express = require("express");
const basic_routes = require("./router/basic_router");
const player_entry_router = require("./router/player_entry_router");
const player_view_router = require("./router/player_view_router");
const team_router = require("./router/team_router");
const point_router = require("./router/points_router");
const db_connect = require("./db/connect");
const cors = require("cors");
const http = require("http");
const { initialize_socket_server } = require("./socket");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
const server = new http.createServer(app);
const io = initialize_socket_server(server);
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cricket-auction-eta.vercel.app"],
    credentials: true, // If you are sending credentials with the request
  })
);

app.use("/api", basic_routes);
app.use("/insert_player_data", player_entry_router);
app.use("/player_view", player_view_router);
app.use("/team", team_router);
app.use("/points", point_router);

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
