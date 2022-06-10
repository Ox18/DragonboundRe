import { Router } from "express";

import * as IdController from "../../../controllers/api/Events/id";
import * as Controller from "../../../controllers/api/Events";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
