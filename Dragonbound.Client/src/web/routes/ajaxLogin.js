import { Router } from "express";

import { post } from "../controllers/ajaxLogin";

const router = Router();

router.post("/", post);

export default router;