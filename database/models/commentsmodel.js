import mongoose from 'mongoose';
const commentSchema = mongoose.Schema(
  {
    commentText: {
      type: String,
      required: [true, 'name is required'],
    },
    commentOwner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: [true, 'name is required'],
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
