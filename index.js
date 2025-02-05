/* Para levantar el proyecto llamamos config de dotenv*/
import { config } from "dotenv";
import { initServer } from "./configs/server.js";
// uso de los metodos en server para el levantamiento
config();
initServer();