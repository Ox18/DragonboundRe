import { Router } from "express";
import * as APIGetStatusController from "../controllers/api/getStatus";

const router = Router();

router.get("/get_status", APIGetStatusController.get);

export default router;