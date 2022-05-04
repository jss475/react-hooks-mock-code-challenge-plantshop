import React from "react";

function PlantCard({name, image, price, handleImageClick, handleStockClick, stock, deletePlant}) {

  


  return (
    <li className="card">
      <img src={image} alt={name} onClick = {()=>handleImageClick(name, price)} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {(deletePlant === name) ? (
        <button onClick = {()=>handleStockClick(name)}>Out of Stock</button>
      ) : (
        <button className="primary" onClick = {()=>handleStockClick(name)}>In Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
