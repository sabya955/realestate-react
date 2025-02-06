import React, { useEffect, useState } from "react";
import "./index.css";
import { apis } from "../../comonapi";
import Card from "../card";
import NavBar from "../header";
const Properties = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apis
      .get("api/Products")
      .then((response) => {
        console.log("Fetched products successfully", response);
        setProducts(response.products || []);
      })
      .catch((error) => console.log("Fetch products failed", error));
  }, []);

  
  const isHomePage = window.location.pathname === "/" || window.location.pathname === "/home";

  return (
    <>
    <NavBar />
    <div className="main" >
      <div className="head">
        <p>Featured Listings</p>
        <h1>Find Your Perfect Home</h1>
      </div>
      <div className="properties">

        {products
          .slice(0, isHomePage ? 4 : products.length) 
          .map((product) => (
            <Card key={product.id} {...product}></Card>
          ))}
      </div>

      {isHomePage && products.length > 4 && (
        <a href="/properties" className="view-all-btn">
          View All Properties
        </a>
      )}
    </div>
    </>
  );
};

export default Properties;
