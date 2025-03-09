import jwt from "jsonwebtoken";
import { APIError } from "../utils/APIError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new APIError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
    );

    if (!user) {
      throw new APIError(401, "Invalid Access Token");
    }

    req.user = user; // this is the user that is making the request (what is req.user is this already there before or we added it)
    next();
  } catch (error) {
    throw new APIError(401, error?.message || "Invalid access token");
  }
});



// // auth.middleware.js
//
// const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");
// const { APIError } = require("../utils/apiError");
//
// const verifyJWT = async (req, res, next) => {
//   try {
//     const token =
//         req.cookies?.accessToken ||
//         req.header("Authorization")?.replace("Bearer ", "");
//     console.log("Token received:", token); // Debugging log
//
//     if (!token) {
//       throw new APIError(401, "Unauthorized request");
//     }
//
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const user = await User.findById(decodedToken._id).select(
//         "-password -refreshToken"
//     );
//
//     if (!user) {
//       throw new APIError(401, "Invalid Access Token");
//     }
//
//     req.user = user;
//     next();
//   } catch (error) {
//     next(new APIError(401, error?.message || "Invalid access token"));
//   }
// };
//
// module.exports = { verifyJWT };