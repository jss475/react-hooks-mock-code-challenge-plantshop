import React from "react";
import PlantCard from "./PlantCard";

function PlantList({allPlants, search, handleEdit, handleDelete}) {

  //map all the plants out to be put into cards
  let plantArray = allPlants
  //filter plants by search input
  .filter(plant => {
    if(search === ''){
      return true
    }else{
      return (plant.name.toLowerCase().includes(search.toLowerCase()))
    }
  })
  .map(plant => {
    return <PlantCard key={plant.id} plant={plant} handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  })
  return (
    <ul className="cards">{plantArray}</ul>
  );
}

export default PlantList;
