import { Router } from "express";

import * as IdController from "../../../controllers/api/Guilds/id";
import * as Controller from "../../../controllers/api/Guilds";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
