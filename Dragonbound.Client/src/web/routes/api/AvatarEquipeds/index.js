import { Router } from "express";

import * as IdController from "../../../controllers/api/AvatarEquipeds/id";
import * as Controller from "../../../controllers/api/AvatarEquipeds";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
