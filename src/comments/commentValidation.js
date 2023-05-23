import Joi from 'joi';
export const addCommentschema = Joi.object({
  commentText: Joi.string().min(1).max(200).required(),
  postid: Joi.string().min(24).max(24),
});
export const deleteCommentschema = Joi.object({
  commentId: Joi.string().min(24).max(24),
});

export const updateCommentschema = Joi.object({
  commentId: Joi.string().min(24).max(24),
  commentText: Joi.string().min(1).max(200).required(),
});

export const getAllCommentsToPostSchema = Joi.object({
  postid: Joi.string().min(24).max(24),
});
