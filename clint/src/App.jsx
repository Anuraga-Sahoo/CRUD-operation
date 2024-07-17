import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import Form from './component/Form'

axios.defaults.baseURL = "http://localhost:8000/"

function App() {
  const [addSection , setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name : "",
    email: "",
    mobile: "",
    
  })
  const [formDataEdit, setFormDataEdit] = useState({
    name : "",
    email: "",
    mobile: "",
    _id: ""
  })

  const handelOnChange = (e) => {
    const {value, name} = e.target
    setFormData((preve)=>{
      return {
        ...preve,
        [name] : value
      }
    })
  }
  const [dataList, setDataList] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
    }
  }

  const getFetchData = async() =>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.Success){
      setDataList(data.data.Data)
      // alert(data.data.message)
    }
  }

  useEffect(()=>{
    getFetchData()
  },[])
  // console.log(JSON.stringify(dataList))
  // console.log(dataList)

  const handleDelete = async(id) => {
    const data = await axios.delete("/delete/"+id)
    console.log(data)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update", formDataEdit)
    if(data.data.success){
      getFetchData()
      setEditSection(false)
      alert(data.data.message)
    }
    console.log(data)
  }

  const handelEditOnChange = async(e) => {
    const {value, name} = e.target
    setFormDataEdit((preve)=>{
      return {
        ...preve,
        [name] : value
      }
    })
  }
  const handleEdit = (element) => {
    setFormDataEdit(element)
    setEditSection(true)
  }

  return (
    <>
    <div className="container">
      <button className="btn btn-add" onClick={()=>setAddSection(true) }>Add</button>

      {
        addSection && (
          <Form 
          handleSubmit = {handleSubmit} 
          handelOnChange = {handelOnChange}
          handleClose = {()=>setAddSection(false)}
          rest = {formData}
          />
        )
      }
      {
        editSection && (
          <Form 
          handleSubmit = {handleUpdate} 
          handelOnChange = {handelEditOnChange}
          handleClose = {()=>setEditSection(false)}
          rest = {formDataEdit}
          />
        )
      }

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { dataList[0] ? (
            dataList.map((element)=>{
              console.log(element)
              return(
                <tr>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.mobile}</td>
                  <td>
                    <button className='btn btn-edit' onClick={()=>{handleEdit(element)
                    }}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDelete(element._id)}>Delete</button>
                  </td>
                </tr>
              )
            }
            )
          ) 
          : <p className='noData'>No Data Present in this Table</p>
        }
        </tbody>
        </table>
      </div>
          
    
    </div>
    </>
  )
}

export default App
