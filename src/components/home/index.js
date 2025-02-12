import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch,useSelector } from "react-redux";
import { Alert, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { apis } from "../../comonapi";
import {setUsers,addMessage} from "./homeAction"
const HomePage = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=> state.users.users)
  console.log(users);
  
  useEffect(() => {
    apis
      .get("api/message")
      .then((data) =>{
        dispatch(setUsers(data))
      })
      .catch((Error) => console.log("Fetch users failed", Error));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const validateForm = () => {
    const { email, phone } = formData;
    let isInvalid = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const MANDATORY_FIELDS = ["name", "email", "phone"];
    let saveErrors = {};
    MANDATORY_FIELDS.forEach((field) => {
      if (!formData[field]) {
        console.log("field: " + field);
        console.log("errors: ", errors);
        saveErrors[field] = "This field is required";
        isInvalid = true;
      }
    });

    if (email && !emailRegex.test(email)) {
      saveErrors.email = "Invalid email";
      isInvalid = true;
    }
    if (phone && !phoneRegex.test(phone)) {
      saveErrors.phone = "Invalid phone number";
      isInvalid = true;
    }
    setErrors({ ...saveErrors });
    return isInvalid;
  };
  const createUser = (evt) => {
    evt.preventDefault();

    const isInvalid = validateForm();
    if (isInvalid) {
      console.log("Is invalid: ", errors);
      return;
    }
    setIsSubmitting(true);
    console.log("came to create user callback");
    const token = localStorage.getItem("token");
    if (!token) {
      setIsSubmitting(false);
      setErrorMessage("please login to send message");
      setAlert({ type: "info", message: "please login to send message" });
      return;
    }
    apis
      .post("api/message/", formData)
      .then((data) => {
        setIsSubmitting(false);
        setSuccessMessage("Form submitted successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        dispatch(addMessage(formData))

        console.log(data);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setErrors("Failed to send your message. Please login.");
        console.log(error);
      });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="container">
      <div className="text">
        <h1>Find Your Dream</h1>
        <h1>Home Today</h1>
        <p>
          Discover our extensive listings, unique features, and personalized
          recommendations to help you find your perfect home.
        </p>
        <button>Discover Now</button>
      </div>
      <div className="message">
        <form onSubmit={createUser}>
          <h1>Need help</h1>
          <h1>message us</h1>
          <TextField
            type="text"
            label="Name"
            required
            name="name"
            value={formData.name}
            className="name"
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            type="email"
            name="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email}
            className="mail"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Phone"
            error={!!errors.phone}
            helperText={errors.phone}
            name="phone"
            className="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            placeholder="Message"
            name="message"
            className="text"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <Button
            onClick={createUser}
            disabled={isSubmitting}
            startIcon={<SendIcon />}
          >
            {isSubmitting ? "send..." : "send"}
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
};
export default HomePage;
