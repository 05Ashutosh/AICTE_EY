const Comment = require("../models/comment.model");

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { text, postId, userId } = req.body;

    const newComment = new Comment({
      text,
      post: postId,
      user: userId,
    });

    const savedComment = await newComment.save();

    await savedComment.populate("user", "name");
    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

// Get all comments for a specific post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    ).populate("user", "name");

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};
