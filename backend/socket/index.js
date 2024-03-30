const { Server, Socket } = require("socket.io");
const team_model = require("../models/team_model");

function initialize_socket_server(server) {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://cricket-auction-eta.vercel.app",
      ],
      methods: ["GET", "POST"],
    },
  });
  let server_selected = 0;
  let server_bid_data = {};
  let team_points = {};
  team_model.find({}, { name: 1, points: 1 }).then((res) => {
    res.forEach((data) => {
      team_points[data.name] = data["points"];
    });
    console.log(team_points);
  });

  // let selected = 0;
  // let current_player_bid = {};
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("initial_connection", {
      server_selected,
      server_bid_data: server_bid_data[server_selected],
    });
    socket.on("disconnect", () => {
      console.log("disconnection.... ", socket.id);
    });
    socket.on("selected_player_change", ({ new_selection, initialBids }) => {
      server_selected = new_selection;
      if (!server_bid_data[server_selected]) {
        server_bid_data[server_selected] = initialBids;
      }
      io.emit("selected_player_change", {
        new_selection,
        server_bid_data: server_bid_data[server_selected],
      });
    });

    socket.on("increase_bid", (data) => {
      server_selected = data.selected;
      server_bid_data[server_selected] = data.newPrev;
      socket.broadcast.emit("increase_bid", data);
    });

    socket.on("decrease_bid", (data) => {
      server_selected = data.selected;
      server_bid_data[server_selected] = data.newPrev;
      socket.broadcast.emit("decrease_bid", data);
    });
    socket.on("player_is_sold", (data) => {
      socket.broadcast.emit("player_is_sold", data);
    });
  });
  return io;
}

module.exports = { initialize_socket_server };
