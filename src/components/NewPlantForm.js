import React, {useState, useEffect} from "react";

function NewPlantForm({handleSubmit, editPlant}) {

  //set state for input changes
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    price: ''
  })

  //when form changes set the formData with what's been input
  function handleFormChange(e){
      setFormData({...formData,[e.target.name]: e.target.value})
    // }else if(editPlant.name === formData.name){
    //   setFormData({...formData,[e.target.name]: e.target.value})
    // }else{
    //   setFormData(editPlant)
  }

  useEffect(()=> {
    setFormData(editPlant)
  },[editPlant])

  return (
    <div className="new-plant-form" onSubmit={e=>handleSubmit(e,formData)}>
      <h2>{(editPlant.name === '') ? 'New Plant' : 'Edit Plant'}</h2>
      <form>
        <input type="text" name="name" placeholder="Plant name" onChange = {handleFormChange}
        value={formData.name}
        />
        <input type="text" name="image" placeholder="Image URL" onChange = {handleFormChange} 
        value={formData.image}
        />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange = {handleFormChange} 
        value={formData.price}
        />
        <button type="submit">{(editPlant.name === '') ? 'Add Plant' : 'Edit Plant'}</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
