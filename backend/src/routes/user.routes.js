// Filename: user.routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    changeCurrentPassword, getCurrentUser,
    loginUser,
    logout,
    refreshAccessToken,
    registerUser, updateAccountDetails
} from "../controllers/user.controller.js";

const router = Router();

// Log when a request enters the user router
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] User router hit: ${req.method} ${req.url}`);
    next();
});

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    (req, res, next) => {
        console.log(`[${new Date().toISOString()}] Register route hit with method: ${req.method}`);
        console.log(`[${new Date().toISOString()}] Files received:`, req.files);
        console.log(`[${new Date().toISOString()}] Body received:`, req.body);
        next();
    },
    registerUser
);

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Secured routes
router.route("/logout").post(verifyJWT, logout);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

export default router;