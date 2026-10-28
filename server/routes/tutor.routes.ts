import { Router } from "express";
import { getTutorById, createEvaluation } from "../controllers/tutor.controller";

const router = Router();

router.get("/:id", getTutorById);
router.post("/evaluate", createEvaluation);

export default router;
