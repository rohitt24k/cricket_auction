/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import styles from "./player_card.module.css";
import user_context from "../../context/user_context/user_context";
import socket_context from "../../context/socket_context/socket_context";

const Player_card = ({
  name,
  role,
  index,
  clickable = false,
  sold_price,
  department,
  year,
  image,
  selected = false,
}) => {
  const { userType } = useContext(user_context);
  const { handle_selected_player_change } = useContext(socket_context);
  const [showToggle, setShowToggle] = useState(false);
  // console.log(image);

  // function resizeCloudinaryImage(
  //   url,
  //   width = 200,
  //   height = 200,
  //   cropMode = "fill"
  // ) {
  //   // Check if the provided URL is a valid Cloudinary URL
  //   const cloudinaryRegex =
  //     /^https:\/\/res.cloudinary.com\/[a-zA-Z0-9_-]+\/image\/upload\/v\d+\/(.+)$/;

  //   if (cloudinaryRegex.test(url)) {
  //     // Extract the path of the image from the URL
  //     const [, imagePath] = url.match(cloudinaryRegex);

  //     // Construct the new URL with the specified transformation parameters
  //     const resizedUrl = `https://res.cloudinary.com/dtppyprna/image/upload/w_${width},h_${height},c_${cropMode}/v1711647640/${imagePath}`;

  //     return resizedUrl;
  //   } else {
  //     // If the provided URL is not a valid Cloudinary URL, return the original URL
  //     return url;
  //   }
  // }

  // const resizeUrl = resizeCloudinaryImage(image, 40, 40);

  return (
    <>
      <div
        className={`${styles.frame} ${selected ? styles.selected : ""}`}
        onClick={() => {
          if (clickable && userType == "organizer") {
            handle_selected_player_change(index);
          } else if (!clickable) {
            setShowToggle((p) => !p);
          }
        }}
      >
        <div className={styles.name_img_container}>
          {/* <div className={styles.rectangle}>
          <img src={resizeUrl} alt="" />
        </div> */}
          <div className={styles.name}>{name.split(" ")[0]}</div>
        </div>
        <div className={styles.position}>{role}</div>
      </div>
      {!clickable && showToggle && (
        <div className={styles.playerDetails}>
          <div
            className={styles.cross}
            onClick={() => {
              setShowToggle((p) => !p);
            }}
          >
            O
          </div>
          <div className={styles.imageContainer}>
            {image ? (
              <img src={image} alt="helmet" />
            ) : (
              <img src="./helmet.svg" alt="helmet" />
            )}
          </div>
          <div className={styles.textContainer}>
            <p className={styles.player_name}>
              Name: <span>{name}</span>
            </p>
            <p className={styles.player_dept}>
              Dept: <span>{department}</span>
            </p>
            <p className={styles.player_year}>
              Year: <span>{year}</span>
            </p>
            <p className={styles.player_role}>
              Role: <span>{role}</span>
            </p>
            {sold_price && (
              <p className={styles.sold_price}>
                sold_price: <span>{sold_price}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Player_card;
