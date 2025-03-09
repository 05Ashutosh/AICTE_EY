// like.routes.js
import { Router } from 'express';
import {
    toggleVideoLike,
    toggleCommentLike,
    getLikedVideos
} from '../controllers/like.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// All routes need authentication
router.use(verifyJWT);

router.route('/toggle/video/:videoId').post(toggleVideoLike);
router.route('/toggle/comment/:commentId').post(toggleCommentLike);
router.route('/videos').get(getLikedVideos);

export default router;