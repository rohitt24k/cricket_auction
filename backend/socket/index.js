const { Server, Socket } = require("socket.io");

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
  // let selected = 0;
  // let current_player_bid = {};
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("disconnect", () => {
      console.log("disconnection.... ", socket.id);
    });
    socket.on("selected_player_change", (new_selection) => {
      socket.broadcast.emit("selected_player_change", new_selection);
    });
    socket.on("increase_bid", (team_name) => {
      socket.broadcast.emit("increase_bid", team_name);
    });
    socket.on("decrease_bid", (team_name) => {
      socket.broadcast.emit("decrease_bid", team_name);
    });
  });
  return io;
}

module.exports = { initialize_socket_server };
