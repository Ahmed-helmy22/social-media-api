import Express from 'express';
import validation from '../middleware/joiValidation.js';
import * as postController from './postController.js';
import { multerUpload } from '../middleware/multer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Express.Router();

router.route('/myProfile').get(protect, postController.getMyPosts);
router.route('/profile/:userId').get(protect, postController.getUserPosts);
router
  .route('/')
  .get(protect, postController.getAllposts)
  .post(protect, multerUpload('postPhoto', 'posts'), postController.addPost);
router
  .route('/:postid')
  .patch(protect, multerUpload('postPhoto', 'posts'), postController.updatePost)
  .delete(postController.deletePost);

router.route('/like/:posid').patch(protect, postController.addLike);
router.route('/unlike/:posid').patch(protect, postController.unLike);
export default router;
