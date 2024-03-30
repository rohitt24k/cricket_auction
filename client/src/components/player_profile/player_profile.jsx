import { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from "./player_profile.module.css";
import data_context from "../../context/data_context/data_context";
import socket_context from "../../context/socket_context/socket_context";

const Player_profile = ({ setSold }) => {
  const { data } = useContext(data_context);
  const { selected } = useContext(socket_context);
  const [is_image_loaded, setIs_image_loaded] = useState(false);
  if (data.length != 0) {
    var { name, department, year, role, sold = false, image } = data[selected];
  }

  function resizeCloudinaryImage(
    url,
    width = 200,
    height = 200,
    cropMode = "fill"
  ) {
    // Check if the provided URL is a valid Cloudinary URL
    const cloudinaryRegex =
      /^https:\/\/res.cloudinary.com\/[a-zA-Z0-9_-]+\/image\/upload\/v\d+\/(.+)$/;

    if (cloudinaryRegex.test(url)) {
      // Extract the path of the image from the URL
      const [, imagePath] = url.match(cloudinaryRegex);

      // Construct the new URL with the specified transformation parameters
      const resizedUrl = `https://res.cloudinary.com/dtppyprna/image/upload/w_${width},h_${height},c_${cropMode}/v1711647640/${imagePath}`;

      return resizedUrl;
    } else {
      // If the provided URL is not a valid Cloudinary URL, return the original URL
      return url;
    }
  }

  useEffect(() => {
    setIs_image_loaded(false);
  }, [selected]);

  const resizedUrl = resizeCloudinaryImage(image, 200, 250);

  useEffect(() => {
    setSold(sold);
  }, [sold]);
  return (
    <div className={styles.frame}>
      {/* a image will be here */}
      <div className={styles.player_img}>
        {is_image_loaded ? (
          <img src={resizedUrl} alt="Player Image" />
        ) : (
          <img
            src="./helmet.svg"
            alt="helmet"
            onLoad={() => {
              setIs_image_loaded(true);
            }}
          />
        )}
      </div>
      <section className={styles.player_details}>
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
      </section>
    </div>
  );
};

export default Player_profile;
