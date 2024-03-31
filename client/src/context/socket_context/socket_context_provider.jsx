import { useContext, useEffect, useState } from "react";
import socket_context from "./socket_context";
import { io } from "socket.io-client";
import data_context from "../data_context/data_context";
import user_context from "../user_context/user_context";
import axios from "axios";

function Socket_context_provider({ children }) {
  const { data, team, trigger_team_reload, setData } = useContext(data_context);
  const [socket, setSocket] = useState(null);
  const [selected, setSelected] = useState(0);
  const [current_player_bid, setCurrent_player_bid] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Calculate initial bids when selected changes
    if (data[selected] && Object.keys(current_player_bid).length === 0) {
      const initialBids = {};
      team.forEach(({ name }) => {
        initialBids[name] = data[selected].base_price;
      });

      setCurrent_player_bid(initialBids);
    }
  }, [selected, data]);

  // const url = "http://localhost:3000/";
  const url = "https://cricket-auction-jxb1.onrender.com/";

  useEffect(() => {
    if (!socket) {
      const newSocket = io(url);
      // const newSocket = io("http://localhost:3000/");
      setSocket(newSocket);
      newSocket.on("connect", () => {
        console.log(newSocket.id);
      });
    }

    if (socket) {
      socket.on(
        "initial_connection",
        ({ server_selected, server_bid_data }) => {
          setSelected(server_selected);
          if (server_bid_data) {
            setCurrent_player_bid(server_bid_data);
            // console.log(server_bid_data);
          }
        }
      );
      socket.on(
        "selected_player_change",
        ({ new_selection, server_bid_data }) => {
          setSelected(new_selection);

          if (server_bid_data) {
            setCurrent_player_bid(server_bid_data);
            // console.log(server_bid_data);
          }
        }
      );

      socket.on("increase_bid", ({ newPrev, selected }) => {
        setSelected(selected);
        // console.log(data, selected);

        setCurrent_player_bid(newPrev);
      });

      socket.on("decrease_bid", ({ newPrev, selected }) => {
        setSelected(selected);
        setCurrent_player_bid(newPrev);
      });
      socket.on("player_is_sold", ({ bid_highest_team_name, selected }) => {
        trigger_team_reload();
        // console.log("this is from the socket", selected);

        setData((prev) => {
          const s = [...prev];
          s[selected].sold = true;
          return s;
        });
      });
    }
  }, [socket]);

  function handle_selected_player_change(new_selection) {
    if (!disabled) {
      const initialBids = {};
      team.forEach(({ name }) => {
        initialBids[name] = data[new_selection].base_price;
      });
      setSelected(new_selection);
      socket.emit("selected_player_change", { new_selection, initialBids });
    }
  }

  function increase_bid(team_name, team_point) {
    if (
      !disabled &&
      !data[selected].sold &&
      team_point > current_player_bid[team_name]
    ) {
      // socket.emit("increase_bid", {
      //   team_name,
      //   selected,
      //   bidAmount: current_player_bid[team_name] + 500,
      // });
      setCurrent_player_bid((prev) => {
        const newPrev = { ...prev, [team_name]: prev[team_name] + 500 };
        socket.emit("increase_bid", {
          newPrev,
          selected,
        });
        return newPrev;
      });
    }
  }

  function decrease_bid(team_name, team_point) {
    if (!disabled && !data[selected].sold) {
      // socket.emit("decrease_bid", {
      //   team_name,
      //   selected,
      //   bidAmount:
      //     current_player_bid[team_name] != 0
      //       ? current_player_bid[team_name] - 500
      //       : 0,
      // });
      setCurrent_player_bid((prev) => {
        if (prev[team_name] != 0) {
          const newPrev = { ...prev, [team_name]: prev[team_name] - 500 };
          socket.emit("decrease_bid", {
            newPrev,
            selected,
          });
          return newPrev;
        }
        return prev;
      });
    }
  }

  async function handle() {
    setDisabled(true);
    let bid_highest_team_name = "";
    Object.keys(current_player_bid).forEach((name) => {
      if (
        !current_player_bid[bid_highest_team_name] ||
        current_player_bid[name] > current_player_bid[bid_highest_team_name]
      ) {
        bid_highest_team_name = name;
      }
    });

    async function fetchData() {
      try {
        const response = await axios.post(url + "team/buy", {
          team_name: bid_highest_team_name,
          player_id: data[selected]._id,
          bid_price: current_player_bid[bid_highest_team_name],
        });
        socket.emit("player_is_sold", {
          bid_highest_team_name,
          selected,
        });
        trigger_team_reload();
        setData((prev) => {
          const s = [...prev];
          s[selected].sold = true;
          return s;
        });
        // console.log(response.data);
      } catch (error) {
        console.log("there was an error adding player to team", error);
      }
    }
    await fetchData();
    console.log("nothingg");
    setDisabled(false);
  }

  function handle_player_sell_by_organizer() {
    if (!data[selected].sold) {
      handle();
    }
  }

  return (
    <socket_context.Provider
      value={{
        selected,
        handle_selected_player_change,
        current_player_bid,
        increase_bid,
        decrease_bid,
        handle_player_sell_by_organizer,
      }}
    >
      {children}
    </socket_context.Provider>
  );
}

export default Socket_context_provider;
