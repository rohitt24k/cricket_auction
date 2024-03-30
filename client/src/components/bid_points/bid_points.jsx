import { useContext } from "react";
import styles from "./bid_points.module.css";
import user_context from "../../context/user_context/user_context";
import socket_context from "../../context/socket_context/socket_context";
import data_context from "../../context/data_context/data_context";

const Bid_points = () => {
  const { userType, team_name } = useContext(user_context);
  const {} = useContext(data_context);
  const {
    current_player_bid,
    increase_bid,
    decrease_bid,
    selected,
    handle_player_sell_by_organizer,
  } = useContext(socket_context);
  return (
    <div className={styles.main_frame}>
      {userType == "team_leader" && (
        <div className={styles.frame}>
          <div className={styles.decrease}>
            <button
              onClick={() => {
                decrease_bid(team_name);
              }}
            >
              -
            </button>
          </div>
          {current_player_bid[team_name]}
          <div className={styles.increase}>
            <button
              onClick={() => {
                increase_bid(team_name);
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
      {userType == "organizer" && (
        <div
          className={`${styles.frame} ${styles.sell}`}
          onClick={() => {
            handle_player_sell_by_organizer(current_player_bid, selected);
          }}
        >
          Sell
        </div>
      )}
    </div>
  );
};

export default Bid_points;
