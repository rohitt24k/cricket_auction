import { useContext, useEffect, useState } from "react";
import socket_context from "./socket_context";
import { io } from "socket.io-client";
import data_context from "../data_context/data_context";
import user_context from "../user_context/user_context";

function Socket_context_provider({ children }) {
  const { data, team } = useContext(data_context);
  const [socket, setSocket] = useState(null);
  const [selected, setSelected] = useState(0);
  const [current_player_bid, setCurrent_player_bid] = useState({});

  useEffect(() => {
    // Calculate initial bids when selected changes
    const initialBids = {};
    team.forEach(({ name }) => {
      initialBids[name] = data[selected].base_price;
    });

    setCurrent_player_bid(initialBids);
  }, [selected]);

  useEffect(() => {
    if (!socket) {
      // const newSocket = io("https://cricket-auction-jxb1.onrender.com/");
      const newSocket = io("http://localhost:3000/");
      setSocket(newSocket);
      newSocket.on("connect", () => {
        console.log(newSocket.id);
      });
    }

    if (socket) {
      socket.on("selected_player_change", (new_selection) => {
        setSelected(new_selection);
      });

      socket.on("increase_bid", ({ team_name, selected, bidAmount }) => {
        setSelected(selected);
        setCurrent_player_bid((prev) => {
          return { ...prev, [team_name]: bidAmount };
        });
      });

      socket.on("decrease_bid", ({ team_name, selected, bidAmount }) => {
        setSelected(selected);
        setCurrent_player_bid((prev) => {
          return { ...prev, [team_name]: bidAmount };
        });
      });
    }
  }, [socket]);

  function handle_selected_player_change(new_selection) {
    setSelected(new_selection);
    socket.emit("selected_player_change", new_selection);
  }

  function increase_bid(team_name) {
    socket.emit("increase_bid", {
      team_name,
      selected,
      bidAmount: current_player_bid[team_name] + 500,
    });
    setCurrent_player_bid((prev) => {
      return { ...prev, [team_name]: prev[team_name] + 500 };
    });
  }

  function decrease_bid(team_name) {
    socket.emit("decrease_bid", {
      team_name,
      selected,
      bidAmount:
        current_player_bid[team_name] != 0
          ? current_player_bid[team_name] - 500
          : 0,
    });
    setCurrent_player_bid((prev) => {
      if (prev[team_name] != 0)
        return { ...prev, [team_name]: prev[team_name] - 500 };
      return prev;
    });
  }

  return (
    <socket_context.Provider
      value={{
        selected,
        handle_selected_player_change,
        current_player_bid,
        increase_bid,
        decrease_bid,
      }}
    >
      {children}
    </socket_context.Provider>
  );
}

export default Socket_context_provider;
