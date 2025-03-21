import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Properties from "./components/properties";
import  Check  from "./components/check-users";
import Navbar from "./components/header"
import ErrorBoundary from "./components/erroeBoundary/Error";
import "./App.css";
function App() {
  return (
    <>
    <ErrorBoundary>
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}/>
      <Routes>
        <Route path="/landingPage" element={<LandingPage />}/>
        <Route path="/properties" element={<Properties />} />
        <Route path="/check-users" element={<Check />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
    </ErrorBoundary>
    </>
  );
}

export default App;