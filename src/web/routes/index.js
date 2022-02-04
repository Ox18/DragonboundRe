import { Router } from "express";
import W2Routes from "./w2";
import * as IndexController from "../controllers";

const router = Router();

router.get("/", IndexController.get);
router.use("/w2", W2Routes);

export default router;