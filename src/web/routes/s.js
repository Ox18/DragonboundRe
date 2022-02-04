import { Router } from "express";

import { get } from "../controllers/s";

const router = Router();

router.get("/", get);

export default router;