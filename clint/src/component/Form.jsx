import React from 'react'
import "../App.css"
import { IoMdClose } from "react-icons/io";


function Form({handleSubmit, handelOnChange, handleClose, rest}) {
  return (
    <div className="addContainer">
          <form onSubmit={handleSubmit}>
          <div className="close-btn"  onClick={handleClose}><IoMdClose /></div>
            <label htmlFor="name">Name : </label>
            <input type="text" name="name" id="name" onChange={handelOnChange} value={rest.name} />
  
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" id="email" onChange={handelOnChange} value={rest.email}/>
  
            <label htmlFor="mobile">Mobile :</label>
            <input type="number" name="mobile" id="mobile" onChange={handelOnChange} value={rest.mobile}/>
  
            <button className='btn'>Submit</button>
          </form>
        </div>
  )
}

export default Form
