import express from "express";
import { getPosts, createPost, deletePost, updatePost, incrementLike } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getPosts)
router.post("/post", auth, createPost)
router.delete("/delete/:id", auth, deletePost)
router.put("/update/:id", auth, updatePost)
router.patch("/like/:id", auth, incrementLike)
export default router;