import { useContext, useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import user_context from "../../context/user_context/user_context";
import socket_context from "../../context/socket_context/socket_context";

const Header = () => {
  const { userType, setUserType, setTeam_name, team_point, allTeamPoints } =
    useContext(user_context);
  const [show_code_frame, setShow_code_frame] = useState(false);

  const elem = useRef();

  useEffect(() => {
    elem.current?.querySelector("input").focus();
  }, [show_code_frame]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <div className={styles.div}>Auction LIVE</div>
          <div className={styles.ellipse} />
        </div>
        <div className={styles.header_right}>
          {userType == "organizer" || userType == "team_leader" ? (
            <>
              <div className={styles["text-wrapper"]}>
                {userType === "organizer" ? (
                  <div style={{ display: "flex", gap: "12px" }}>
                    {allTeamPoints?.map((team) => (
                      <div
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          gap: "4px",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <p>{team.name.split(" ")[0]}</p>
                        <p>{team.points}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  "Points: " + team_point
                )}
              </div>
              <div className={styles.rectangle} />
            </>
          ) : (
            <>
              <div
                className={styles.joining_code}
                onClick={() => {
                  setShow_code_frame((curr) => !curr);
                }}
              >
                code
              </div>
              <div className={styles.joining_code_background}>code</div>
            </>
          )}
        </div>
      </div>
      {show_code_frame && (
        <div
          className={styles.code_frame}
          onClick={(e) => {
            if (
              e.target != elem.current &&
              e.target != elem.current.querySelector("input")
            ) {
              setShow_code_frame((curr) => !curr);
            }
          }}
        >
          <div ref={elem} className={styles.code_frame_input}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShow_code_frame((curr) => !curr);
                // if (e.target[0].value === "organizer") {
                //   setUserType("organizer");
                // } else if (e.target[0].value.split(" ")[0] === "leader") {
                //   setUserType("team_leader");
                //   setTeam_name(e.target[0].value.split(" ").slice(1).join(" "));
                // }
                if (e.target[0].value === "9275648391") {
                  setUserType("organizer");
                } else if (e.target[0].value === "5829364017") {
                  setUserType("team_leader");
                  setTeam_name("fearless falcons");
                } else if (e.target[0].value === "1934852076") {
                  setUserType("team_leader");
                  setTeam_name("ankit royals");
                } else if (e.target[0].value === "7462915384") {
                  setUserType("team_leader");
                  setTeam_name("panthar paltan");
                } else if (e.target[0].value === "8204751936") {
                  setUserType("team_leader");
                  setTeam_name("the forever knights");
                } else if (e.target[0].value === "3906842517") {
                  setUserType("team_leader");
                  setTeam_name("saurabh super giants");
                } else if (e.target[0].value === "5732198640") {
                  setUserType("team_leader");
                  setTeam_name("super kings");
                }
              }}
            >
              <input type="text" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
