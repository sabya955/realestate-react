import React, { useEffect ,useState} from "react";
import "./home.css";
import {apis} from "../../comonapi";

const HomePage = () => {
  useEffect(() => {
    apis.get("api/users")
    .then(data => console.log("Fetch users successfully", data))
    .catch(Error => console.log("Fetch users failed", Error));
  },[]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [successMessage,setSuccessMessage] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const validateForm =()=>{
    const { email, phone } = formData;
    let isInvalid = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const MANDATORY_FIELDS = ['name', 'email','phone']; // {name: required, email: invalid, phone: invalid}}
    let saveErrors = {};
    MANDATORY_FIELDS.forEach((field)=>{
      if(!formData[field]){
        console.log("field: " + field);
        console.log("errors: ", errors);
        saveErrors[field] = 'This field is required';
        isInvalid= true;
      }
    });

    if(email &&!emailRegex.test(email)){
      saveErrors.email = 'Invalid email';
        //setErrors({...errors, email: 'Please enter a valid email address'})
        isInvalid=true
      }
      if(phone &&!phoneRegex.test(phone)){
        saveErrors.phone = 'Invalid phone number';
        //setErrors({...errors, phone: 'Please enter a valid 10-digit phone number'})
        isInvalid=true
      }
      setErrors({...saveErrors});
      return isInvalid
  }
  const createUser = (evt) => {
    evt.preventDefault();
    
    const isInvalid = validateForm();
    if (isInvalid){
      console.log("Is invalid: ",errors);
      return 
    }
    setIsSubmitting(true); 
   console.log("came to create user callback");
   const token = localStorage.getItem('token');
   if(!token){
    setIsSubmitting(false)
    setErrorMessage("please login to send message")
    return;
   }
   apis
   .post("api/users/", formData)
    .then((data) => {
      setIsSubmitting(false)
        setSuccessMessage('Form submitted successfully!')

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
     
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
        <div className="call">
          <p>+1 910-626-85255</p>
        </div>
        <h1>Find Your Dream</h1>
        <h1>Home Today</h1>
        <p>
          Discover our extensive listings, unique features, and personalized
          recommendations to help you find your perfect home.
        </p>
        <button>Discover Now</button>
      </div>
      <div className="message">
        <form onSubmit={createUser} >
          <h1>Need help</h1>
          <h1>message us</h1>
          <input type="text" required placeholder="Name" name="name" value={formData.name} className="name" onChange={handleChange}/>
          <span className="errorMesage">{errors.name}</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="mail"
            value={formData.email}
            onChange={handleChange}
          />
          <span className="errorMesage">{errors.email}</span>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <span className="errorMesage">{errors.phone}</span>
          <textarea
            placeholder="Message"
            name="message"
            className="text"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button onClick={createUser} disabled={isSubmitting}>{isSubmitting ? "send...":"send"}</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        {successMessage && <p>{successMessage}</p>}

      </div>
    </div>
  );
};
export default HomePage;