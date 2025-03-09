// // auth.routes.js
// import { Router } from "express";
// import {
//   registerUser,
//   loginUser,
//   logout,
//   refreshAccessToken,
//   changeCurrentPassword,
//   getCurrentUser,
//   updateAccountDetails,
// } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
//
// export const router = Router();
//
// router.route("/register").post(
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "coverImage", maxCount: 1 },
//   ]),
//   registerUser
// );
//
// router.route("/login").post(loginUser);
//
// // Secured routes
// router.route("/logout").post(verifyJWT, logout);
// router.route("/refresh-token").post(refreshAccessToken);
// router.route("/change-password").post(verifyJWT, changeCurrentPassword);
// router.route("/current-user").get(verifyJWT, getCurrentUser);
// router.route("/update-account").patch(verifyJWT, updateAccountDetails);
//
// export default router;
