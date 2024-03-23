import { useEffect, useRef, useState } from "react";
import styles from "./player_detail_upload.module.css";
import axios from "axios";

const Player_detail_upload = () => {
  const [successMessage, setSuccessMessage] = useState("");
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
        const result = await axios.post(
          "http://localhost:3000/inset_player_data/",
          formData
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
        <div className={styles.form_area}>
          <p className={styles.title}>PLAYER DETAIL</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="name">
                Name{" "}
                {errors.name && (
                  <span className={styles.error}>({errors.name})</span>
                )}
              </label>
              <input
                name="name"
                placeholder="Enter your full name"
                id="name"
                className={styles.form_style}
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="email">
                Email{" "}
                {errors.email && (
                  <span className={styles.error}>({errors.email})</span>
                )}
              </label>
              <input
                name="email"
                placeholder="Enter your email"
                id="email"
                className={styles.form_style}
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="department">
                Department{" "}
                {errors.department && (
                  <span className={styles.error}>({errors.department})</span>
                )}
              </label>
              <select
                name="department"
                id="department"
                className={styles.form_style_select}
                value={formData.department}
                onChange={handleChange}
              >
                <option value="cse">CSE</option>
                <option value="it">IT</option>
                <option value="ee">EE</option>
                <option value="ece">ECE</option>
                <option value="aiml">AIML</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="year">
                Year{" "}
                {errors.year && (
                  <span className={styles.error}>({errors.year})</span>
                )}
              </label>
              <select
                name="year"
                id="year"
                className={styles.form_style_select}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="first">First</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
                <option value="fourth">Fourth</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="role">
                Role{" "}
                {errors.role && <p className={styles.error}>({errors.role})</p>}
              </label>
              <select
                name="role"
                id="role"
                className={styles.form_style_select}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="all_rounder">All Rounder</option>
                <option value="wicket_keeper">Wicket Keeper</option>
                <option value="batsman">Batsman</option>
                <option value="bowler">Bowler</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="base_price">
                Base Price{" "}
                {errors.base_price && (
                  <span className={styles.error}>({errors.base_price})</span>
                )}
              </label>
              <select
                name="base_price"
                id="base_price"
                className={styles.form_style_select}
                value={formData.base_price}
                onChange={handleChange}
              >
                <option value="batsman">500</option>
                <option value="bowler">1000</option>
              </select>
            </div>
            <div className={styles.form_group}>
              <label className={styles.sub_title} htmlFor="player_type">
                Select player type{" "}
                {errors.player_type && (
                  <span className={styles.error}>({errors.player_type})</span>
                )}
              </label>
              <select
                name="player_type"
                id="player_type"
                className={styles.form_style_select}
                value={formData.player_type}
                onChange={handleChange}
              >
                <option value="player">Player</option>
                <option value="team_leader">Team Leader</option>
              </select>
              {formData.player_type == "team_leader" && (
                <div className={styles.extra}>
                  <label className={styles.sub_title} htmlFor="team_name">
                    team name{" "}
                    {errors.team_name && (
                      <span className={styles.error}>({errors.team_name})</span>
                    )}
                  </label>
                  <input
                    name="team_name"
                    placeholder="Enter your Team Name"
                    id="team_name"
                    className={styles.form_style}
                    type="text"
                    value={formData.team_name}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className={styles.form_group}>
              <button
                className={styles.btn}
                type="button"
                onClick={() => {
                  widgetRef.current.open();
                }}
              >
                upload Image
              </button>
              {errors.image && <p className={styles.error}>{errors.image}</p>}
            </div>
            <div className={styles.final_submit}>
              <button className={styles.btn}>SIGN UP</button>
              {errors.error && <p className={styles.error}>{errors.error}</p>}
            </div>
          </form>
          {successMessage && (
            <p className={styles.successMessage}>{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player_detail_upload;
