import { Router } from "express";

import * as IdController from "../../../controllers/api/Users/id";
import * as Controller from "../../../controllers/api/Users";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
