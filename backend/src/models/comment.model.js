const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // Recipe that the comment belongs to
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required,
    },
    // Owner of the comment
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
