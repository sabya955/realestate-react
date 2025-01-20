import React, { useEffect, useState } from "react";
import "./index.css";
import { apis } from "../../comonapi";
import Card from "../card";

const Properties = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    apis
      .get("api/Products")
      .then((response) => {
        console.log("Fetch products successfully", response);
        setProducts(response);
      })
      .catch((Error) => console.log("Fetch produt failed", Error));
  },[]);

  return (
    <div className="main">
      <div className="head">
        <p>Featured Listings</p>
        <h1>Find Your Perfect Home</h1>
      </div>
      <div className="properties">
        {products.map((product) => (
          <Card
            key={product.id}
            {...product}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Properties;