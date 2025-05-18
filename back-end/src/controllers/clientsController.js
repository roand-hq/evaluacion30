import clients from "../models/clients.js";
const clientsController = {};

clientsController.getClients = async (req, res) => {
  const Clients = await clients.find();
  res.json(Clients);
};

clientsController.deleteClient = async (req, res) => {
  const deletedClient = await clients.findByIdAndDelete(req.params.id);
  res.json({ message: "Cliente eliminado exitosamente" });
};

clientsController.updateClient = async (req, res) => {
  try {
    const { name, email, phoneNumber, address,dui } = req.body;
    const updatedClient = await clients.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, address,dui },
      { new: true }
    );
    res.json({message: "Cliente actualizado exitosamente"})
  } catch (error) {}
};

export default clientsController;