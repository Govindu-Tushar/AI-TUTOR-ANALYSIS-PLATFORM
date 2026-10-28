import { Router } from "express";
import courseRoutes from "./course.routes";
import tutorRoutes from "./tutor.routes";
import mentorRoutes from "./mentor.routes";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/tutors", tutorRoutes);
router.use("/mentor", mentorRoutes);

export default router;
