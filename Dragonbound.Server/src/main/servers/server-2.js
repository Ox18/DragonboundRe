import { SuperServerController } from "../../presentation/controllers/super-server-controller";

export default (ws) => {
    const serverController = new SuperServerController(ws, 2);
    return serverController;
}