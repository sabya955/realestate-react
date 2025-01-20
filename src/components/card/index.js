import React from "react";
import './index.css';

const Card = (props) => {
    const {image,availability,name,type,price,details } = props;
    return (
        <div className="product-card">
            <img src={image} alt={name} />
            <h4>{availability}</h4>
            <h2>{name}</h2>
            <h3>{type}</h3>
            <p>{price}</p>
            <p>{details}</p>
        </div>
    );
}
export default Card;