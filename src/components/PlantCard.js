import React, {useState} from "react";

function PlantCard({plant, handleEdit, handleDelete}) {

  const {id,name,image,price} = plant

  //set state of clicking stock
  const [stock, setStock] = useState(true)

  //callback for handling stock change
  function handleStock(){
    setStock(stock => !stock)
  }

  return (
    <li className="card" onClick = {()=>handleEdit(plant)}>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {stock ? (
        <button className="primary" onClick = {handleStock}>In Stock</button>
      ) : (
        <button onClick ={handleStock}>Out of Stock</button>
      )}
      <button className ='primary' onClick={()=>handleDelete(id)}>Delete Button</button>
    </li>
  );
}

export default PlantCard;
