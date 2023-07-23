import express from "express"
import { createReview, getReviews, deleteReview } from "../controllers/reviewController.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.post("/", verifyToken, createReview)
router.get("/:gigId", getReviews)
router.delete("/:id", verifyToken, deleteReview)

export default router