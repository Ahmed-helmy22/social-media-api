import Express from 'express';
import validation from '../middleware/joiValidation.js';
import * as authController from './authController.js';
import {
  forgetPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from './authValidation.js';
const router = Express.Router();

router.post('/login', validation(loginSchema), authController.login);
router.post('/signup', validation(signupSchema), authController.signup);
router.get('/verify/:token', authController.verify);
router.post(
  '/forgetPassword',
  validation(forgetPasswordSchema),
  authController.forgetPassword
);
router.patch(
  '/resetPassword/:token',
  validation(resetPasswordSchema),
  authController.resetPassword
);

export default router;
