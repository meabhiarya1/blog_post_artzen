import { Router } from "express";
import {
  addPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.use(verifyToken);

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", addPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
