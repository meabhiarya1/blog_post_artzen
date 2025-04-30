import { Posts } from "../models/postModel.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (
      ![title, content, author].every(
        (field) => typeof field === "string" && field.trim() !== ""
      )
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPost = new Posts({ title, content, author });
    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ post: savedPost, message: "Post added successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ post: updatedPost, message: "Post updated successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

export { getPosts, addPost, updatePost, deletePost, getPostById };
