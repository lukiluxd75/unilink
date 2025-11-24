import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { getMyApplications, getAllApplications, reviewApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.get("/my-applications", authenticate, authorize("student"), getMyApplications);
router.get("/", authenticate, authorize("admin"), getAllApplications);
router.patch("/:id/review", authenticate, authorize("admin"), reviewApplication);

export default router;
