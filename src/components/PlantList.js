import React from "react";
import PlantCard from "./PlantCard";

function PlantList({allPlants, search, handleImageClick, editPrice, editName, handleStockClick, stock, deletePlant}) {

  let plantList = allPlants
  
  .filter(plant => {
    if(plant.name.toLowerCase().includes(search.toLowerCase())){
      return plant
    }else if(search === ''){
      return plant
    }
    })
  //.filter(plant => plant.name !== deletePlant)
  .map(plant => {
    if(editName === plant.name){
      return <PlantCard key = {plant.name} name = {plant.name} image = {plant.image} price = {editPrice} 
      handleImageClick={handleImageClick}
      handleStockClick={handleStockClick}
      stock = {stock}
      deletePlant = {deletePlant}
      />
    }else{
      return <PlantCard key = {plant.name} name = {plant.name} image = {plant.image} price = {plant.price} 
      handleImageClick={handleImageClick}
      handleStockClick={handleStockClick}
      stock = {stock}
      deletePlant = {deletePlant}
      />
    }
    
  })
  return (
    <ul className="cards">{plantList}</ul>
  );
}

export default PlantList;
