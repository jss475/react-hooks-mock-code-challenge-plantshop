import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
 
  //set state of all plants in database
  const [allPlants, setAllPlants] = useState([])
 
  //fetch initial plant data on initial render
  useEffect(()=> {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setAllPlants(data))
  },[])

  //create callback for the submit form
  function handleSubmit(e,formData){
    e.preventDefault()
    //if edit plant has been clicked then PATCH and update the plant
    if(e.target.textContent === 'Edit Plant'){
      let filteredData = allPlants.filter(plant => {
        return plant.name === formData.name 
      })
  
      let configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }

      fetch(`http://localhost:6001/plants/${filteredData[0].id}`,configObj)
      .then(res=>res.json())
      .then(data => {
        let filteredArray = allPlants.map(plant => {
          if(plant.name === data.name){
            return data
          }else{
            return plant
          }
        })
        setAllPlants(filteredArray)
        setEditPlant({
          name: '',
          image: '',
          price: ''
        })
      })


    }else{
      let configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
  
      fetch('http://localhost:6001/plants',configObj)
      .then(res=>res.json())
      .then(data => setAllPlants(data))
    }

  }

  //create state for search input changing
  const [search,setSearch] = useState('')
  //create callback for search
  function handleSearch(e){
    setSearch(e.target.value)
  }

  //set plant we want to edit
  const [editPlant, setEditPlant] = useState({
    name: '',
    image: '',
    price: ''
  })
  //create callback for editing
  function handleEdit(plant){
    setEditPlant(plant)
  }

  //callback to handle delete of plant
  function handleDelete(id){

    let configObj = {
      method:'DELETE'
    }
    fetch(`http://localhost:6001/plants/${id}`,configObj)
    .then(res=>res.json())
    .then(data => {
      let filteredArray = allPlants.filter(plant => {
        return plant.id !== id
      })
      setAllPlants(filteredArray)
    })
  
  }



  return (
    <main>
      <NewPlantForm handleSubmit={handleSubmit} editPlant={editPlant}/>
      <Search handleSearch={handleSearch} search = {search}/>
      <PlantList allPlants={allPlants} search={search} handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </main>
  );
}

export default PlantPage;
