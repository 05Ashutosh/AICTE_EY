// const Comment = require("../models/comment.model");
//
// // Create a new comment
// exports.createComment = async (req, res) => {
//   try {
//     const { text, postId, userId } = req.body;
//
//     const newComment = new Comment({
//       text,
//       post: postId,
//       user: userId,
//     });
//
//     const savedComment = await newComment.save();
//
//     await savedComment.populate("user", "name");
//     res.status(201).json(savedComment);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating comment", error: error.message });
//   }
// };
//
// // Get all comments for a specific post
// exports.getCommentsByPost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const comments = await Comment.find({ post: postId })
//       .populate("user", "name")
//       .sort({ createdAt: -1 });
//
//     res.status(200).json(comments);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching comments", error: error.message });
//   }
// };
//
// // Update a comment
// exports.updateComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;
//     const { text } = req.body;
//
//     const updatedComment = await Comment.findByIdAndUpdate(
//       commentId,
//       { text },
//       { new: true }
//     ).populate("user", "name");
//
//     if (!updatedComment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }
//
//     res.status(200).json(updatedComment);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating comment", error: error.message });
//   }
// };
//
// // Delete a comment
// exports.deleteComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;
//
//     const deletedComment = await Comment.findByIdAndDelete(commentId);
//
//     if (!deletedComment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }
//
//     res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting comment", error: error.message });
//   }
// };



import Comment from "../models/comment.model.js";

// const Comment = require("../models/comment.model");

// Create a new comment
import {APIError} from "../utils/APIError.js";
import {APIResponse} from "../utils/APIResponse.js";

export const createComment = async (req, res) => {
  try {
    const { recipeId } = req.params; // Correctly get recipeId from URL parameters
    const { content } = req.body;    // Get content from request body
    const userId = req.user._id;     // Authenticated user's ID

    // Validation
    if (!content || !recipeId) {
      throw new APIError(400, "Both content and recipe ID are required");
    }

    // Create new comment
    const newComment = new Comment({
      content,
      recipe: recipeId,
      owner: userId,
    });

    // Save to database
    const savedComment = await newComment.save();

    // Populate owner details
    await savedComment.populate("owner", "username");

    // Success response
    return res.status(201).json(
        new APIResponse(
            201,
            savedComment,
            "Comment created successfully"
        )
    );

  } catch (error) {
    // Error handling
    return res.status(error.statusCode || 500).json(
        new APIError(
            error.statusCode || 500,
            error.message || "Error creating comment",
            [error.message]  // Errors as array
        )
    );
  }
};

// Get all comments for a specific post
// export const getCommentsByPost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const comments = await Comment.find({ post: postId })
//         .populate("user", "name")
//         .sort({ createdAt: -1 });
//     res.status(200).json(comments);
//   } catch (error) {
//     res
//         .status(500)
//         .json({ message: "Error fetching comments", error: error.message });
//   }
// };

// export const getCommentsByPost = async (req, res) => {
//   try {
//     const { recipeId } = req.params;
//     const { page = 1, limit = 20 } = req.query;
//
//     const comments = await Comment.find({ recipe: recipeId })
//         .populate("user", "name")
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit);
//
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching comments", error: error.message });
//   }
// };

export const getCommentsByPost = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const comments = await Comment.find({ recipe: recipeId })
        .populate("owner", "username")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const totalComments = await Comment.countDocuments({ recipe: recipeId });

    res.status(200).json(
        new APIResponse(200, {
          comments,
          pagination: {
            total: totalComments,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(totalComments / limit),
          },
        })
    );
  } catch (error) {
    res.status(500).json(new APIError(500, "Error fetching comments"));
  }
};

// Update a comment
export const updateComment = async (req, res) => {
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
export const deleteComment = async (req, res) => {
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