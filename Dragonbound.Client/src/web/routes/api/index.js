import { Router } from "express";
import * as Get_StatusController from "../../controllers/api/get_status";
import ServersRoute from "./servers/index";

const router = Router();

router.use("/servers", ServersRoute);
router.get("/get_status", Get_StatusController.get);

export default router;