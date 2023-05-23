import Express from 'express';
import validation from '../middleware/joiValidation.js';
import * as commentController from './commentsController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
  addCommentschema,
  updateCommentschema,
  deleteCommentschema,
  getAllCommentsToPostSchema,
} from './commentValidation.js';

const router = Express.Router();

router
  .route('/:postid')
  .post(protect, validation(addCommentschema), commentController.addComment);
router
  .route('/:postid')
  .get(
    protect,
    validation(getAllCommentsToPostSchema),
    commentController.getAllCommentsToPost
  );
router
  .route('/:commentId')
  .patch(
    protect,
    validation(updateCommentschema),
    commentController.updateComment
  );
router
  .route('/:commentId')
  .delete(
    protect,
    validation(deleteCommentschema),
    commentController.deleteComment
  );
router
  .route('/deleteComment/:postid/:commentid')
  .delete(protect, commentController.deleteCommentonMyPost);
export default router;
