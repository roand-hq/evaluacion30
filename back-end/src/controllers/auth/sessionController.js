import employees from "../../models/employee.js";
import clients from "../../models/clients.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

const sessionController = {};

sessionController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userFound; 
    let userType; //de que tipo es este usuario
      //Empleado
      userFound = await employees.findOne({ email });
      userType = "employee";

      //Cliente
      if (!userFound) {
        userFound = await clients.findOne({ email });
        userType = "client";
        console.log("es ckuebte")
      }
    
    if (!userFound) {
      return res.json({ message: "user not found :((" });
    }
    //Desencriptar contraseña si NO soy admin
    if (userType !== "admin") {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
       return res.json({ message: "Invalid password :((" });
      }
    }
    //TOKEN
    const token = jsonwebtoken.sign(
      { id: userFound._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expires }
    );
    res.cookie("authToken", token);
    res.json({message:"Inicio de sesion exitoso"})
  } catch (error) {
    console.log("error: " + error);
    res.json({ message: "errorsito" });
  }
};

sessionController.logout = async (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Sesión cerrada con exito" });
};
export default sessionController;
