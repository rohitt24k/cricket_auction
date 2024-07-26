import { useEffect, useRef, useState } from "react";
import styles from "./player_detail_upload.module.css";
import axios from "axios";
import { animate, motion } from "framer-motion";

const itemVarient = {
  initial: { y: 10, opacity: 0 },
  open: { y: 0, opacity: 1 },
};

const Player_detail_upload = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dtppyprna",
        uploadPreset: "njuljtzr",
      },
      (err, result) => {
        if (result.event == "success") {
          const url = result.info.secure_url;
          setFormData((prev) => ({ ...prev, image: url }));
        }
      }
    );
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "cse",
    year: "first",
    previous_team: "none",
    role: "all_rounder",
    base_price: "500",
    player_type: "player",
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    previous_team: "",
    role: "",
    base_price: "",
    player_type: "",
    team_name: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
    } else {
      setErrors(formErrors);
      try {
        const formDataLowercase = {};

        for (const key in formData) {
          if (typeof formData[key] === "string") {
            if (key === "base_price") {
              formDataLowercase[key.toLowerCase()] = parseInt(formData[key]);
            } else {
              formDataLowercase[key.toLowerCase()] =
                formData[key].toLowerCase();
            }
          } else {
            formDataLowercase[key.toLowerCase()] = formData[key];
          }
        }
        setIsLoading(true);
        const result = await axios.post(
          // "https://cricket-auction-jxb1.onrender.com/insert_player_data/",
          "http://localhost:3000/insert_player_data",
          formDataLowercase
        );
        // console.log(result);
        // result.data.message
        setSuccessMessage(result.data.message);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

        // Reset form data after successful submission
        setFormData({
          name: "",
          email: "",
          department: "cse",
          year: "first",
          role: "all_rounder",
          base_price: "500",
          player_type: "player",
          image: "",
        });

        // Optionally, you can display a success message to the user
      } catch (error) {
        // If there's an error response from the server, handle it
        // console.log(error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const backendErrors = error.response.data;
          console.log(backendErrors);

          // Update errors state with backend errors
          setErrors((prevErrors) => ({
            ...prevErrors,
            ...backendErrors,
          }));
        } else {
          console.error("Error submitting form:", error);
          // Handle other types of errors (e.g., network errors)
          // You can display a generic error message to the user
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    // Check if all required fields are filled
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.department) {
      errors.department = "Department is required";
    }
    if (!formData.year) {
      errors.year = "Year is required";
    }
    if (!formData.role) {
      errors.role = "Role is required";
    }
    if (!formData.base_price) {
      errors.base_price = "Base Price is required";
    }
    if (!formData.player_type) {
      errors.player_type = "Player Type is required";
    } else if (formData.player_type == "team_leader" && !formData.team_name) {
      errors.team_name = "Team Name is required";
    }
    if (!formData.image) {
      errors.image = "Please provide a image";
    }
    return errors;
  };

  return (
    <div className={styles.frame}>
      {/* <button
        onClick={() => {
          widgetRef.current.open();
        }}
      >
        upload
      </button> */}
      <div className={styles.container}>
        <motion.div
          className={styles.form_area}
          initial="initial"
          animate="open"
          variants={{
            initial: { y: 20, opacity: 0 }, // Initial state
            open: {
              y: 0,
              opacity: 1,
              transition: {
                type: "spring",
                delayChildren: 0.3,
                staggerChildren: 0.07,
              },
            },
          }}
        >
          <p className={styles.title}>PLAYER DETAIL</p>
          <form onSubmit={handleSubmit}>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="name">
                Name{" "}
                {errors.name && (
                  <span className={styles.error}>({errors.name})</span>
                )}
              </label>
              <motion.input
                name="name"
                placeholder="Enter your full name"
                id="name"
                className={styles.form_style}
                type="text"
                value={formData.name}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              />
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="email">
                Email{" "}
                {errors.email && (
                  <span className={styles.error}>({errors.email})</span>
                )}
              </label>
              <motion.input
                name="email"
                placeholder="Enter your email"
                id="email"
                className={styles.form_style}
                type="email"
                value={formData.email}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              />
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="department">
                Department{" "}
                {errors.department && (
                  <span className={styles.error}>({errors.department})</span>
                )}
              </label>
              <motion.select
                name="department"
                id="department"
                className={styles.form_style_select}
                value={formData.department}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="cse">CSE</option>
                <option value="it">IT</option>
                <option value="ee">EE</option>
                <option value="ece">ECE</option>
                <option value="aiml">AIML</option>
                <option value="csbs">CSBS</option>
                <option value="csds">CSDS</option>
                <option value="bca">BCA</option>
                <option value="b.com">B.COM</option>
                <option value="eie">EIE</option>
                <option value="other">Other</option>
              </motion.select>
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="year">
                Year{" "}
                {errors.year && (
                  <span className={styles.error}>({errors.year})</span>
                )}
              </label>
              <motion.select
                name="year"
                id="year"
                className={styles.form_style_select}
                value={formData.year}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="first">First</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
                <option value="fourth">Fourth</option>
              </motion.select>
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="previous_team">
                Previous Team(if any){" "}
                {errors.previous_team && (
                  <p className={styles.error}>({errors.previous_team})</p>
                )}
              </label>
              <motion.select
                name="previous_team"
                id="previous_team"
                className={styles.form_style_select}
                value={formData.previous_team}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="none">None</option>
                <option value="eagle thunderbolts">Eagle Thunderbolts</option>
                <option value="ankit royals">Ankit Royals</option>
                <option value="super kings">Super Kings</option>
                <option value="ruthless runner">Ruthless Runner</option>
                <option value="saurabh super gaints">
                  Saurabh Super Gaints
                </option>
                <option value="panther paltan">Panther Paltan</option>
              </motion.select>
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="role">
                Role{" "}
                {errors.role && <p className={styles.error}>({errors.role})</p>}
              </label>
              <motion.select
                name="role"
                id="role"
                className={styles.form_style_select}
                value={formData.role}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="all_rounder">All Rounder</option>
                <option value="wicket_keeper">Wicket Keeper</option>
                <option value="batsman">Batsman</option>
                <option value="bowler">Bowler</option>
              </motion.select>
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="base_price">
                Base Price{" "}
                {errors.base_price && (
                  <span className={styles.error}>({errors.base_price})</span>
                )}
              </label>
              <motion.select
                name="base_price"
                id="base_price"
                className={styles.form_style_select}
                value={formData.base_price}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="500">500</option>
                <option value="1000">1000</option>
              </motion.select>
            </motion.div>
            <motion.div className={styles.form_group} variants={itemVarient}>
              <label className={styles.sub_title} htmlFor="player_type">
                Select player type{" "}
                {errors.player_type && (
                  <span className={styles.error}>({errors.player_type})</span>
                )}
              </label>
              <motion.select
                name="player_type"
                id="player_type"
                className={styles.form_style_select}
                value={formData.player_type}
                onChange={handleChange}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
              >
                <option value="player">Player</option>
                <option value="team_leader">Team Leader</option>
              </motion.select>
              {formData.player_type == "team_leader" && (
                <div className={styles.extra}>
                  <label className={styles.sub_title} htmlFor="team_name">
                    team name{" "}
                    {errors.team_name && (
                      <span className={styles.error}>({errors.team_name})</span>
                    )}
                  </label>
                  <motion.input
                    name="team_name"
                    placeholder="Enter your Team Name"
                    id="team_name"
                    className={styles.form_style}
                    type="text"
                    value={formData.team_name}
                    onChange={handleChange}
                    whileHover={{ scale: 1.03 }}
                    whileFocus={{ scale: 1.03 }}
                  />
                </div>
              )}
            </motion.div>
            <motion.div
              className={styles.form_upload_image}
              variants={itemVarient}
            >
              <motion.button
                className={styles.btn}
                type="button"
                onClick={() => {
                  widgetRef.current.open();
                }}
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
              >
                Upload Your Image{" "}
                {formData.image && (
                  <img
                    className={styles.check_circle}
                    src="check_circle.svg"
                    alt="check_circle"
                  />
                )}
              </motion.button>
              {errors.image && <p className={styles.error}>{errors.image}</p>}
            </motion.div>
            <motion.div className={styles.final_submit} variants={itemVarient}>
              <motion.button
                className={styles.btn}
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <img
                    src="loader.svg"
                    alt="loading..."
                    width={30}
                    height={30}
                  />
                ) : (
                  "REGISTER"
                )}
              </motion.button>
              {errors.error && <p className={styles.error}>{errors.error}</p>}
            </motion.div>
          </form>
          {successMessage && (
            <p className={styles.successMessage}>{successMessage}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Player_detail_upload;
