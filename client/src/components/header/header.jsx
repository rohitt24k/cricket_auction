import { useContext, useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import user_context from "../../context/user_context/user_context";

const Header = () => {
  const { userType, setUserType } = useContext(user_context);
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
              <div className={styles["text-wrapper"]}>Points: 1,00,000</div>
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
                if (e.target[0].value == "noice") {
                  setUserType("organizer");
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
