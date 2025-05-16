import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
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
  position: {
    type: String,
    require: true,
  },
  hiringDate: {
    type: Date,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
    min: 365.0,
  },
  dui: {
    type: String,
    require: true,
    unique: true
  },
},{
    timestamps: true
});
export default model("Employees", employeesSchema)