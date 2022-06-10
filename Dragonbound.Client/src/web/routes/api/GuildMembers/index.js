import { Router } from "express";

import * as IdController from "../../../controllers/api/GuildMembers/id";
import * as Controller from "../../../controllers/api/GuildMembers";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
