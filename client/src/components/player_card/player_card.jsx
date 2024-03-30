/* eslint-disable react/prop-types */
import { useContext } from "react";
import styles from "./player_card.module.css";
import user_context from "../../context/user_context/user_context";
import data_context from "../../context/data_context/data_context";
import socket_context from "../../context/socket_context/socket_context";

const Player_card = ({ name, role, index, clickable = false, image }) => {
  const { userType } = useContext(user_context);
  const { handle_selected_player_change } = useContext(socket_context);

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
    <div
      className={styles.frame}
      onClick={() => {
        if (clickable && userType == "organizer") {
          handle_selected_player_change(index);
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
  );
};

export default Player_card;
