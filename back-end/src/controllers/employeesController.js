import employees from "../models/employee.js";
const employeesController = {};

employeesController.getEmployees = async (req, res) => {
  const Employees = await employees.find();
  res.json(Employees);
};

employeesController.deleteEmployees = async (req, res) => {
  const deletedEmployee = await employees.findByIdAndDelete(req.params.id);
  res.json({ message: "Empleado eliminado exitosamente" });
};

employeesController.updateEmployee = async (req, res) => {
  try {
    const { name, email, phoneNumber, address,position,hiringDate,salary,dui } = req.body;
    const updatedEmployee = await employees.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, address,position,hiringDate,salary,dui },
      { new: true }
    );
    res.json({message: "Empleado actualizado exitosamente"})
  } catch (error) {}
};

export default employeesController;