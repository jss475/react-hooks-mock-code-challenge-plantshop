import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  
  //set state for the list of all plants
  const [allPlants, setAllPlants] = useState([])
  //create a fetch request in plant page to send data down to its children
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setAllPlants(data))
  },[])

  //create callback for form submit
  function handlePlantSubmit(e, name, image, price){
    e.preventDefault()

    if(name === editName){
      let plantToEdit = allPlants.filter(plant => plant.name === editName)
      console.log(plantToEdit)
      let editPlant = {
        name: plantToEdit[0].name,
        image: plantToEdit[0].image,
        price: price
      }

      let configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editPlant)
      }

      fetch(`http://localhost:6001/plants/${plantToEdit[0].id}`, configObj)
        .then(resp => resp.json())
        .then(data => setEditPrice(+data.price))
      setButtonName(buttonName => !buttonName)

      console.log(editPlant)
    }else{
      let newPlant = {
        name: name,
        image: image,
        price: price
      }
  
      let configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlant)
      }
  
      fetch('http://localhost:6001/plants', configObj)
        .then(res => res.json())
        .then(data => console.log(`Submitted data: ${data}`))
      setAllPlants([...allPlants,newPlant])
    }
  }

  //set state for the search
  const [search, setSearch] = useState('')
  //callback function for search
  function handleSearch(e){
    setSearch(e.target.value)
  }

  //set state for edits to price
  const [editPrice, setEditPrice] = useState('')
  const [editName, setEditName] = useState('')
  const [buttonName, setButtonName] = useState(true)
  //callback for when the image is clicked to change price
  function handleImageClick(name,price){
    console.log(name)
    console.log(price)
    setEditPrice(price)
    setEditName(name)
    setButtonName(buttonName => !buttonName)
  }

  //set state for in stock
  const [stock, setStock] = useState(true)
  const [deletePlant, setDeletePlant] = useState('')
  //callback function to indicate out of stock
  function handleStockClick(name){
    setStock(stock => !stock)
    setDeletePlant(name)
    let deletedPlant = allPlants.filter(plant => plant.name === name)
    debugger
    let configObj = {
      method: 'DELETE'
    }
    fetch(`http://localhost:6001/plants/${deletedPlant[0].id}`,configObj)
      .then(resp => resp.json())
      .then(data => data)

    let notDeletedPlants = allPlants.filter(plant => plant.name !== name)

    setAllPlants(notDeletedPlants)
  }

  return (
    <main>
      <NewPlantForm handlePlantSubmit={handlePlantSubmit} editPrice = {editPrice} editName = {editName} buttonName = {buttonName}/>
      <Search handleSearch = {handleSearch} search = {search}/>
      <PlantList allPlants = {allPlants} search = {search} handleImageClick={handleImageClick} editPrice = {editPrice} 
      editName = {editName}
      handleStockClick={handleStockClick}
      stock = {stock}
      deletePlant = {deletePlant}
      />
    </main>
  );
}

export default PlantPage;
