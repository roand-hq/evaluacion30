import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import employeesModel from "../../models/employee.js";
import { config } from "../../config.js";
const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    address,
    position,
    hiringDate,
    salary,
    dui,
  } = req.body;

  try {
    const employeeExists = await employeesModel.findOne({ email });
    if (employeeExists) return res.json({ message: "Ese empleado ya existe" });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new employeesModel({
      name,
      email,
      password: encryptedPassword,
      phoneNumber,
      address,
      position,
      hiringDate,
      salary,
      dui,
    });
    await newEmployee.save();
    JWT.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({ message: "Empleado registrado correctamente" });
      }
    );
  } catch (error) {
    console.log("error: " + error);
    res.json({ message: "errorsito" });
  }
};

export default registerEmployeesController;
