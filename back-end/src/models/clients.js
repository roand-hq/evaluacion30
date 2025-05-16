import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  dui: {
    type: String,
    require: true,
  },
},{
timestamps:true
});
export default model("Clients", clientsSchema)