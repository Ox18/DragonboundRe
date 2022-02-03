import { Router } from "express";

import { get } from "../controllers/test";

const router = Router();

router.get("/", get);

export default router;