import React, { useState ,useEffect} from "react";
import "./index.css";
import { apis } from "../../comonapi";

const NavBar = () => {
  const [error, setErrors] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
   if(token){
    setIsLoggedIn(true)
    const storeUser = JSON.parse(localStorage.getItem('user'))
    setUser(storeUser)
   }
  },[])
  const handleInputChange = (e) => {
    console.log("Targets: " + e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const { email, password } = formData;
    let isInvalid = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let saveErrors = {};
    const MANDATORY_FIELDS = isSignup ? ["email", "password", "confirmPassword", "fullName"] : ["email", "password"];
    if(isSignup){
      console.log("Is sign up", MANDATORY_FIELDS);
      MANDATORY_FIELDS.forEach((field)=>{
        if (!formData[field]) {
          saveErrors[field] = "This field is required";
          isInvalid = true;
        }
      })
    }else{
      console.log("is log in", MANDATORY_FIELDS);
      MANDATORY_FIELDS.forEach((field)=>{
        if (!formData[field]){
          saveErrors[field] = "This field is required";
          isInvalid = true;
        }
      });
    }
    if (email && !emailRegex.test(email)) {
      saveErrors.email = "Invalid email";
      isInvalid = true;
    }
    // if (password && !passwordRegex.test(password)) {
    //   saveErrors.password =
    //     "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    //   isInvalid = true;
    // }
    setErrors({ ...saveErrors });
    return isInvalid;
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const isInvalid = validateForm();
    console.log("is invalid", isInvalid);
    if (isInvalid) {
      console.log("Is invalid: ", error);
      return;
    }

    const endpoint = isSignup ? "api/auth/signup" : "api/auth/login";
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    apis
      .post(endpoint, formData)
      .then((data) => {
        alert(data.message);
        if (!isSignup && data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUser(data.user);
          window.location.reload();
        }
        setShowModal(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <header>
      <nav className="nav">
        <h1>RealEstate</h1>
        <div className="link">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#properties">Properties</a>
          <a href="#contact">Contact</a>
          {isLoggedIn ? (
            <div className="logged-in">
              <span>Welcome, {user?.fullName || "User"}!</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button
              className="signup-loginBtn"
              onClick={() => setShowModal(true)}
            >
              Signup/Login
            </button>
          )}
        </div>
        <div className="logo">
          <button onClick={() => setShowMenu(!showMenu)}>...</button>
        </div>
        {showMenu && (
          <div className="dropDown">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#properties">Properties</a>
            <a href="#contact">Contact</a>
            
            <button
              className="signup-loginBtn"
              onClick={() => setShowModal(true)}
            >
              Signup/Login
            </button>
          </div>
        )}
      </nav>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isSignup ? "Signup" : "Login"}</h2>
            {isSignup ? (
               <form onSubmit={handelSubmit}>
                
                 <label>
                   Full Name:
                   <input
                     type="text"
                     placeholder="Enter your full name"
                     value={formData.fullName}
                     name="fullName"
                     onChange={handleInputChange}
                   />
                   <span className="errorMesage">{error.fullName}</span>
                 </label>
               
               <label>
                 Email:
                 <input
                   type="email"
                   placeholder="Enter your email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                 />
                 <span className="errorMesage">{error.email}</span>
               </label>
               <label>
                 Password:
                 <input
                   type="password"
                   placeholder="Enter your password"
                   name="password"
                   value={formData.password}
                   onChange={handleInputChange}
                 />
                 <span className="errorMesage">{error.password}</span>
               </label>
                 <label>
                   Confirm Password:
                   <input
                     type="password"
                     placeholder="Confirm your password"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleInputChange}
                   />
                   <span className="errorMesage">{error.confirmPassword}</span>
                 </label>
               <button type="submit">{isSignup ? "Signup" : "Login"}</button>
             </form>
            ) : (
              <form onSubmit={handelSubmit}>
                <label>
                  Email:
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <span className="errorMesage">{error.email}</span>
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span className="errorMesage">{error.password}</span>
                </label>
                <button type="submit">{isSignup? "Signup" : "Login"}</button>
              </form>
            )}
           
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                className="toggle-button"
                onClick={() => {
                  setIsSignup(!isSignup); 
                  setErrors({});
                }}
              >
                {isSignup ? "Login" : "Signup"}
              </button>
            </p>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
