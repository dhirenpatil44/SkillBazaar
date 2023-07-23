import express from "express"
import { deleteGig, createGig, getGig, getGigs } from "../controllers/gigController.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.post("/", verifyToken, createGig)
router.delete("/:id", verifyToken, deleteGig)
router.get("/single/:id", getGig)
router.get("/", getGigs)

export default router