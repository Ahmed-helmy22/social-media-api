import commentModel from '../../database/models/commentsmodel.js';
import postModel from '../../database/models/postModel.js';
import AppErr from '../error/AppErr.js';
import { catchErr } from '../error/catchErr.js';

export const addComment = catchErr(async (req, res, next) => {
  const { postid } = req.params;
  const { id } = req.user;
  const { commentText } = req.body;
  const comment = await commentModel.insertMany({
    commentText,
    commentOwner: id,
    post: postid,
  });
  return res.status(201).json({ status: 'success', comment });
});

export const deleteComment = catchErr(async (req, res, next) => {
  const { commentId } = req.params;
  const deletedComment = await commentModel.deleteOne({
    commentOwner: req.user.id,
    _id: commentId,
  });
  if (!deletedComment)
    next(
      new AppErr('the comment doesnt exist or ypu are not allwod to delete it')
    );
  res.status(200).json({
    status: 'success',
    deletedComment,
  });
});

export const getAllCommentsToPost = catchErr(async (req, res, next) => {
  const { postid } = req.params;
  const allCommments = await commentModel.find({ post: postid });
  if (!allCommments)
    next(new AppErr('no comments yet , or post doesnt exist', 400));

  res.status(200).json({
    status: 'success',
    allCommments,
  });
});

export const updateComment = catchErr(async (req, res, next) => {
  const { commentId } = req.params;
  const { id } = req.user;
  const { commentText } = req.body;
  const updatedComment = await commentModel.updateOne(
    {
      commentOwner: id,
      _id: commentId,
    },
    { commentText },
    { new: true }
  );

  if (!updatedComment) next(new AppErr('the comment doesnt exist', 404));
  res.status(200).json({
    status: 'success',
    updatedComment,
  });
});

export const deleteCommentonMyPost = catchErr(async (req, res, next) => {
  const { postid, commentid } = req.params;
  const post = await postModel.findOne({ _id: postid, createdBy: req.user.id });
  if (!post) next(new AppErr('post dosnt exist', 404));
  const deletedComment = await commentModel.findOneAndDelete({
    _id: commentid,
    post: postid,
  });
  res.status(200).json({
    status: 'success',
    deletedComment,
  });
});
