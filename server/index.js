const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 8000

//schema
const schemaData =mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
},{timestamps: true})

const userModel = mongoose.model("user", schemaData)

mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>console.log("connected"))
.catch((err)=>console.log(err))

//read data
app.get("/",async (req, res) => {
  const data = await userModel.find({})
  res.json({Success: true, Data: data , length: data.length, message: "data shows successfully"})
})

// create data || save data in mongodb
app.post('/create',async (req, res) => {
  console.log(req.body)
  const data = new userModel(req.body)
  const dataLength = await userModel.find({})
  await data.save()
  res.send({success: true,datalength: dataLength.length, message: "data save ", Data: data})
})

// update data
app.put("/update", async(req, res) => {
  console.log(req.body)
  const {_id, ...rest} = req.body
  const data = await userModel.updateOne({_id: _id}, rest)
  res.send({success: true, message: "data updated", Data: data})
})

// delete api
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id)
  const data =  await userModel.deleteOne({_id:id})
  res.send({success: true, message: "data delete successfully", length: data.length, Data: data})
})

app.listen(PORT, () => console.log(`"Server is running on" http://localhost:${PORT}`))