import { sendMail, HTMLRecoveryMail } from "../../utils/mailRecoveryPassword.js";
import clientModel from "../../models/clients.js";
import employeeModel from "../../models/employee.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";
import bycriptjs from "bcryptjs";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  const { email } = req.body;
  try {
    let userFound;
    let userType;
    userFound = await clientModel.findOne({ email });
    if (userFound) userType = "Client";
    else userFound = employeeModel.findOne({ email });
    if (userFound) userType = "Employee";

    if (!userFound) {
      return res.json({ message: "User not found" });
    }
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    const token = jsonwebtoken.sign(
      { email, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });
    sendMail(
      email,
      "PASSWORD RECOVERY CODE",
      `Your verification code is ${code}`,
      HTMLRecoveryMail(code)
    );

    res.json("Correo enviado ");
  } catch (error) {
    console.log("Algo salio mal: " + error);
  }
};

recoveryPasswordController.verifyCode = async (req, res) => {
  const { code } = req.body;
  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.code !== code) return res.json({ message: "invalid code" });

    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.log("Error al verificar token: " + error);
  }
};

recoveryPasswordController.newPassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    const token = req.cookies.tokenRecoveryCode;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (!decoded.verified) return res.json({ message: "Code not verified" });
    const { email, userType } = decoded;
    const hashedPassword = await bycriptjs.hash(newPassword, 10);

    let updateUser;
    if (userType === "client") {
      updateUser = await clientModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }
    if (userType === "employee") {
      updateUser = await employeeModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }
    res.clearCookie("tokenRecoveryCode");
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("El error cambiando la contraseña es: " + error);
  }
};
export default recoveryPasswordController;
