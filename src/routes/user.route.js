import express from 'express';
import { userController } from '../controllers/index.js';
import verifyToken from '../middlewares/auth.middleware.js';
import catchAsync from '../utils/catchAsync.js';

const router = express.Router();

router.get('/current-user',
    verifyToken,
    catchAsync(userController.getCurrentUserInfo));
router.get('/project-access-list',
    verifyToken,
    catchAsync(userController.getProjectAccessList));
router.get('/page-access-list/:projectId',
    verifyToken,
    catchAsync(userController.getPageAccessList));

export default router;