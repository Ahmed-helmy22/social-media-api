import Express from 'express';
import validation from '../middleware/joiValidation.js';
import * as userController from './userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { udatePasswordSchema, updateSchema } from './userVlidation.js';
import { multerUpload } from '../middleware/multer.js';

const router = Express.Router();
router
  .route('/')
  .patch(
    protect,
    validation(updateSchema),
    multerUpload('userPhoto', 'users'),
    userController.updateMe
  )
  .delete(protect, userController.deleteMe)
  .get(protect, userController.getMe);
router.patch(
  '/updatePasssword',
  protect,
  validation(udatePasswordSchema),
  userController.updateMyPassword
);
router.patch('/:softDelete', protect, userController.softDelete);
export default router;
