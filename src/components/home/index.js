import React from "react";
import "./home.css";

const HomePage = () => {
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
        <form>
          <h1>Need help</h1>
          <h1>message us</h1>
          <input type="text" placeholder="Name" name="name" className="name" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="mail"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className="phone"
          />
          <textarea
            placeholder="Message"
            name="message"
            className="text"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
