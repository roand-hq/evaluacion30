//importar todo lo de express que instale con npm install
import express from 'express'   
import cookieParser from 'cookie-parser';
import loginRoutes from "./src/routes/login.js"
import registerEmployeeRoutes from "./src/routes/registerEmployee.js"
import registerClientRoutes from "./src/routes/registerClient.js"
import logoutRoutes from "./src/routes/logout.js"
import recoveryPasswordRoutes from './src/routes/recoveryPassword.js';
import moviesRoutes from "./src/routes/movies.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
// Crea una constante que es igual a la librería que importe
const app = express();

app.use(express.json())
app.use(cookieParser())

//Recordar siempre agregar el cors
app.use("/cinema/registerClient",registerClientRoutes)
app.use("/cinema/registerEmployee",registerEmployeeRoutes)
app.use("/cinema/login",loginRoutes)
app.use("/cinema/logout",logoutRoutes)
app.use("/cinema/recoveryPassword",recoveryPasswordRoutes)
app.use("/cinema/movies",moviesRoutes)
app.use("/cinema/clients",clientsRoutes)
app.use("/cinema/employees",employeesRoutes)
// Exporta la constante app en otros archivos
export default app;

