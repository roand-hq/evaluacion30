import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import clientsModel from "../../models/clients.js";
import { config } from "../../config.js";
const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  const { name, email, password, phoneNumber, address, dui } = req.body;

  try {
    const clientExists = await clientsModel.findOne({ email });
    if (clientExists) return res.json({ message: "Ese usuario ya existe" });
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newClient = new clientsModel({
      name,
      email,
      password: encryptedPassword,
      phoneNumber,
      address,
      dui,
    });
    await newClient.save();
    JWT.sign(
      { id: newClient._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({ message: "Usuario registrado correctamente" });
      }
    );
  } catch (error) {
    console.log("error: " + error);
    res.json({ message: "errorsito" });
  }
};

export default registerClientsController;
