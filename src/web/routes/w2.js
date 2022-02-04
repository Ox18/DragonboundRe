import { Router } from "express";
import { get } from "../controllers/w2";

const router = Router();

router.get("/", get);

export default router;