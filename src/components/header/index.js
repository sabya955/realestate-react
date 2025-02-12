import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Alert,TextField,Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import PersonIcon from '@mui/icons-material/Person';
import { apis } from "../../comonapi";
import { useSelector,useDispatch } from "react-redux";
import {login,logout} from './authAction'

const NavBar = () => {
  const dispatch = useDispatch()
  const {isLoggedIn,user} =useSelector((state)=>state.auth)
  const [alert, setAlert] = useState({type:"", message:""});
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [user, setUser] = useState(null)
  const Navigate = useNavigate();
  useEffect(()=>{
   setAlert({type:"",message:""})
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
      setAlert({ type: "error", message: "Passwords do not match" });
      return;
    }
    apis
      .post(endpoint, formData)
      .then((data) => {
        setAlert({ type: "success", message: data.message });
        if (!isSignup && data.token) {
          dispatch(login(data.user));
          localStorage.setItem("token",data.token)
          setTimeout(()=>{
          window.location.reload();
          },2000)
        }
        setShowModal(false);
      })
      .catch((error) => {
        setAlert({ type: "error", message: error.message });
      });
  };
  const handleLogout = () => {
   dispatch(logout())
    setAlert({type:"info", message:"you have been logged out"})
    Navigate("/landingPage",{replace:true})
    setTimeout(()=>{
      window.location.reload();
    },2000)
  };
  const handelModelClose = ()=>{
      setShowModal(false)
  } 
  const handelPropertiesClick =()=>{
    if(isLoggedIn){
      window.location.href="/properties"
    }else{
      // showModal(true)
    }
  }
  // const shouldShowNavBar = !window.location.pathname.includes('properties');
  return (
  <header>
      <nav className="nav">
        <h1>RealEstate</h1>
        <div className="link">
          <a href="/landingPage">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#properties" onClick={handelPropertiesClick}>Properties</a>
          <a href="#contact">Contact</a>
          {user?.role === "admin" && (
           <a href="/check-users" className="admin-link">
        Check Users
      </a>
    )}
          {isLoggedIn ? (
            <div className="logged-in">
              <span className="username_display"><PersonIcon className="icon" /> {user?.fullName || "User"}!</span>
    
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowModal(true)}
          >
            Signup/Login
          </Button>

          )}
        </div>
        <div className="logo">
        <DensityMediumIcon onClick={() => setShowMenu(!showMenu)} style={{ fontSize: 40, color: "blue" }} />
        </div>
        {showMenu && (
          <div className="dropDown">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#properties">Properties</a>
            <a href="#contact">Contact</a>
            
            <Button
              variant="contained"
              color="primery"
              className="signup-loginBtn"
              onClick={() => setShowModal(true)}
            >
              Signup/Login
            </Button>
          </div>
        )}
      </nav>
    
        
      {alert.message && (
        <Alert
          severity={alert.type}
          onClose={() => {setAlert({ type: "", message: "" })
          
        }}
          style={{ margin: "10px 0" }}
        >
          {alert.message}
        </Alert>
      )}
      
      {showModal && (
        <div className="modal-overlay" onClick={handelModelClose}>
          <div className="modal" style={{position:"relative"}} onClick={(e) => e.stopPropagation()}>
          <CloseIcon
        style={{
          color: "#333", 
          cursor: "pointer",
          position: "absolute",
          top: "10px", 
          right: "10px", 
          fontSize: "24px", 
        }}
        onClick={(e) => {
          e.stopPropagation()
          setShowModal(false)
          
        }}
      />

            
            <h2>{isSignup ? "Signup" : "Login"}</h2>
            {isSignup ? (
               <form onSubmit={handelSubmit}>
                
               <TextField
               type="text"
                 label="Full Name"
                 fullWidth
                 margin="normal"
                 name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={! ! error.fullName}
                  helperText={error.fullName}
                 />
                  <TextField
                  type="email"
                  label="Email"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={! ! error.email}
                  helperText={error.email}
                  />
                  <TextField 
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={! ! error.password}
                  helperText={error.password}
                  />
                  <TextField
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  margin="normal"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={! ! error.confirmPassword}
                  helperText={error.confirmPassword}
                  />
               <Button type="submit"
                className="switchBtn" 
               variant=" primary"
                color="primary"
                style={{marginTop:"16px"}}
               >{isSignup ? "Signup" : "Login"}</Button>
             </form>
            ) : (
              <form onSubmit={handelSubmit}>
                <TextField 
                type="text"
                label="Email"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={! ! error.email}
                helperText={error.email}
                />
                <TextField 
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={! ! error.password}
                helperText={error.password}                
                />
                <Button type="submit"
                className="switchBtn"
                variant=" primary"
                color="primary"
                style={{marginTop:"16px"}}
                >{isSignup? "Signup" : "Login"}</Button>
              </form>
            )}
           
            <p className="switch">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <Button
                type="button"
                variant="primery"
                className="switchBtn"
                onClick={() => {
                  setIsSignup(!isSignup); 
                  setErrors({});
                }}
              >
                {isSignup ? "Login" : "Signup"}
              </Button>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;