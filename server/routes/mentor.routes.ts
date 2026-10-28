import { Router } from "express";
import { handleMentorMessage } from "../controllers/mentor.controller";

const router = Router();

router.post("/", handleMentorMessage);

export default router;
