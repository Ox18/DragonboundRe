import { Router } from "express";
import * as ServersController from "../../../controllers/api/Servers";

const router = Router();

router.get("/", ServersController.get);

export default router;