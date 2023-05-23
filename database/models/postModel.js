import mongoose from 'mongoose';
const postSchema = mongoose.Schema(
  {
    postText: {
      type: String,
      required: [true, 'post is required'],
    },
    totalLikes: { type: Number, default: 0 },
    postPhoto: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    likes: {
      type: [String],
      default: [],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  {
    timestamps: true,
  }
);
postSchema.virtual('comments', {
  foreignField: 'post',
  localField: '_id',
  ref: 'Comment',
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
