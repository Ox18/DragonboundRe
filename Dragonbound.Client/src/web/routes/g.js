import { Router } from "express";
import { get, post } from "../controllers/g";

const router = Router();

router.get("/", get);
router.post("/", post);

export default router;