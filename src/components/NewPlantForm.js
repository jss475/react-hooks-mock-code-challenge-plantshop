import React, {useState, useEffect} from "react";

function NewPlantForm({handlePlantSubmit, editPrice, editName, buttonName}) {

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')


  function handleNameChange(e){
    setName(e.target.value)
  }

  function handleImageChange(e){
    setImage(e.target.value)
  }

  function handlePriceChange(e){
    setPrice(e.target.value)
  }

  //add a useEffect to update the price form with the plant that was selected
  useEffect(()=> {
    setPrice(editPrice)
    setName(editName)
  },[editPrice, editName])

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit = {(e)=> handlePlantSubmit(e, name, image, price)}>
        <input type="text" name="name" placeholder="Plant name" onChange = {handleNameChange} value ={name}/>
        <input type="text" name="image" placeholder="Image URL" onChange = {handleImageChange} value = {image}/>
        <input type="number" name="price" step="0.01" placeholder="Price" onChange = {handlePriceChange} value = {price} />
        <button type="submit">{(buttonName === true) ? 'Add Plant' : 'Edit Plant'}</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
