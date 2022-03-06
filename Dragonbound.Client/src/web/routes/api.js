import { Router } from "express";
import * as APIGetStatusController from "../controllers/api/getStatus";
import * as APIServersController from "../controllers/api/Servers";

const router = Router();

router.get("/get_status", APIGetStatusController.get);
router.get("/servers", APIServersController.get);

export default router;