import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { createOpportunity, getOpportunities, applyToOpportunity } from "../controllers/opportunityController.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin"), createOpportunity);
router.get("/", authenticate, getOpportunities);
router.post("/:id/apply", authenticate, authorize("student"), applyToOpportunity);

export default router;
