import postModel from '../../database/models/postModel.js';
import AppErr from '../error/AppErr.js';
import { catchErr } from '../error/catchErr.js';

export const getAllposts = catchErr(async (req, res, next) => {
  const posts = await postModel.find().populate('comments');
  if (!posts) next(new AppErr('no posts yet'), 404);
  res.status(200).json({
    status: 'success',
    posts,
  });
});
export const addPost = catchErr(async (req, res, next) => {
  const { postText } = req.body;
  const { filename } = req.file;

  const post = await postModel.insertMany({
    postPhoto: filename,
    postText,
    createdBy: req.user.id,
  });
  res.status(201).json({
    status: 'success',
    post,
  });
});

export const updatePost = catchErr(async (req, res, next) => {
  const { postText } = req.body;
  const { filename } = req.file;
  const { postid } = req.params;
  const post = await postModel
    .updateOne(
      { createdBy: req.user.id, _id: postid },
      {
        postPhoto: filename,
        postText,
      }
    )
    .populate('comments');
  if (!post) next(new AppErr('you cant not update this post'), 400);
  res.status(200).json({
    status: 'success',
    post,
  });
});

export const deletePost = catchErr(async (req, res, next) => {
  const { posid } = req.params;
  const post = await postModel.deleteOne({
    _id: posid,
    createdBy: req.user.id,
  });
  if (!post) next(new AppErr('the post is not exsist', 404));
  return res.status(200).json({ status: 'success', post });
});

export const getMyPosts = catchErr(async (req, res, next) => {
  const myPosts = await postModel
    .findOne({ createdBy: req.user.id })
    .populate('comments');
  if (!myPosts) next(new AppErr('no posts yet', 200));
  return res.status(200).json({ status: 'success', myPosts });
});

export const getUserPosts = catchErr(async (req, res, next) => {
  const { userId } = req.params;
  const userPosts = await postModel
    .find({ createdBy: userId })
    .populate('comments');
  if (!userPosts) next(new AppErr('no posts yet', 200));
  return res.status(200).json({ status: 'success', userPosts });
});

export const addLike = catchErr(async (req, res, next) => {
  const { posid } = req.params;
  const post = await postModel.findByIdAndUpdate(
    posid,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  );

  post.totalLikes = post.likes.length;
  await post.save();
  res.json({ post });
});
export const unLike = catchErr(async (req, res, next) => {
  const { posid } = req.params;
  const post = await postModel.findByIdAndUpdate(
    posid,
    {
      $pull: { likes: req.user.id },
    },
    { new: true }
  );
  post.totalLikes = post.likes.length;
  await post.save();
  res.json({ post });
});
