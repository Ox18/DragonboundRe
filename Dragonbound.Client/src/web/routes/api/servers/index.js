import { Router } from "express";
import * as ServersController from "../../../controllers/api/Servers";
import * as ServersIdController from "../../../controllers/api/Servers/id";

const router = Router();

router.get("/", ServersController.get);
router.get("/:id", ServersIdController.get);

export default router;