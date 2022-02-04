import { Router } from "express";

// Controller default  
import * as IndexController from "../controllers";

// Routes
import W2Routes from "./w2";
import GRoutes from "./g";
import SRoutes from "./s";
import AjaxLoginRoutes from "./ajaxLogin";

const router = Router();

router.get("/", IndexController.get);
router.use("/w2", W2Routes);
router.use("/g", GRoutes);
router.use("/s", SRoutes);
router.use("/ajaxLogin", AjaxLoginRoutes);


export default router;