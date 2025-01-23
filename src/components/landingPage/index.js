import React from "react";
import HomePage from "../home";
import Properties from "../properties";
import About from "../about";
import Contact from "../contact";
const LandingPage = ()=>{
  return (
      <div className="app">
        <section id="home">
          <HomePage />
        </section>
        <section id="properties">
          <Properties />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    );
}
export default LandingPage;