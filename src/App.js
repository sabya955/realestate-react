import "./App.css";
import HomePage from "./components/home";
import NavBar from "./components/header";
import Properties from "./components/properties";
import About from "./components/about";
import Contact from "./components/contact";

function App() {
  return (
    <div className="app">
      <NavBar />
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
        <Contact/>
      </section>
    </div>
  );
}

export default App;

