import { Router } from "express";

import * as IdController from "../../../controllers/api/Accounts/id";
import * as Controller from "../../../controllers/api/Accounts";

const router = Router();

router.get("/", Controller.get);
router.get("/:id", IdController.get);

export default router;
