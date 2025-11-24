import express from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { uploadCertificate, getMyCertificates } from "../controllers/certificateController.js";

const router = express.Router();

router.get("/", authenticate, getMyCertificates);
router.post("/", authenticate, authorize("teacher"), uploadCertificate);

export default router;
