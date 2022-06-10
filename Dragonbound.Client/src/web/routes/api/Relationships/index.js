import { Router } from "express";

import * as IdController from "../../../controllers/api/Relationships/id";
import * as Controller from "../../../controllers/api/Relationships";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
