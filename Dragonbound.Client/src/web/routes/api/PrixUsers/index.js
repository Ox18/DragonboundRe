import { Router } from "express";

import * as IdController from "../../../controllers/api/PrixUsers/id";
import * as Controller from "../../../controllers/api/PrixUsers";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
