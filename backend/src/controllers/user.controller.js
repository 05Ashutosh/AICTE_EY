import { User } from "../models/user.model.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary, cloudinaryDelete } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

// why we are not storing the accessToken
// const generateAccessAndRefreshToken = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();
//
//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });
//
//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new APIError(500, "Token generation failed");
//   }
// };


// const registerUser = asyncHandler(async (req, res) => {
//   console.log(`[${new Date().toISOString()}] Entering registerUser controller`);
//
//   const { fullName, email, username, password } = req.body;
//   console.log(`[${new Date().toISOString()}] Request body:`, { fullName, email, username, password });
//
//   if ([fullName, email, username, password].some((field) => field?.trim() == "")) {
//     console.log(`[${new Date().toISOString()}] Validation failed: Some fields are empty`);
//     throw new APIError(400, "All fields are required");
//   }
//
//   const existedUser = await User.findOne({
//     $or: [{ username }, { email }],
//   });
//   if (existedUser) {
//     console.log(`[${new Date().toISOString()}] User already exists with username: ${username} or email: ${email}`);
//     throw new APIError(409, "User with email or username already exists");
//   }
//
//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   let coverImageLocalPath;
//   if (req.files && Array.isArray(req.files.coverImage)) {
//     coverImageLocalPath = req.files.coverImage[0].path;
//   }
//   console.log(`[${new Date().toISOString()}] Avatar path: ${avatarLocalPath}, Cover image path: ${coverImageLocalPath}`);
//
//   if (!avatarLocalPath) {
//     console.log(`[${new Date().toISOString()}] Avatar file is missing`);
//     throw new APIError(400, "Avatar file is required");
//   }
//
//   const avatar = await uploadOnCloudinary(avatarLocalPath);
//   console.log(`[${new Date().toISOString()}] Avatar uploaded to Cloudinary:`, avatar?.url || "Upload failed");
//
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
//   console.log(`[${new Date().toISOString()}] Cover image uploaded to Cloudinary:`, coverImage?.url || "No cover image or upload failed");
//
//   if (!avatar) {
//     console.log(`[${new Date().toISOString()}] Avatar upload to Cloudinary failed`);
//     throw new APIError(400, "Avatar file is required");
//   }
//
//   const user = await User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username: username.toLowerCase(),
//   });
//   console.log(`[${new Date().toISOString()}] User created with ID: ${user._id}`);
//
//   const createdUser = await User.findById(user._id).select("-password -refreshToken");
//   if (!createdUser) {
//     console.log(`[${new Date().toISOString()}] Failed to fetch newly created user`);
//     throw new APIError(500, "Something went wrong while registering the user");
//   }
//
//   console.log(`[${new Date().toISOString()}] Registration successful for user: ${createdUser.username}`);
//   return res
//       .status(201)
//       .json(new APIResponse(201, createdUser, "User registered successfully"));
// });
//
//
// // const registerUser = asyncHandler(async (req, res) => {
// //   // get user details from frontend
// //   // validation - not empty
// //   // check if user already exists: username, email
// //   // check for images, check for avatar
// //   // upload them to cloudinary, avatar
// //   // create user object - create entry in db
// //   // remove password and refresh token field from response
// //   // check for user creation
// //   // return res
// //
// //   // const {fullName, email, username, password} = req.body;
// //   //
// //   // if (
// //   //     [fullName, email, username, password].some((field) => field?.trim() == "")
// //   // ) {
// //   //   throw new APIError(400, "All fileds are required");
// //   // }
// //   //
// //   // const existedUser = await User.findOne({
// //   //   $or: [{username}, {email}],
// //   // });
// //   //
// //   // if (existedUser) {
// //   //   throw new APIError(409, "User with email or username already exists");
// //   // }
// //   //
// //   // const avatarLocalPath = req.files?.avatar[0]?.path;
// //   // let coverImageLocalPath;
// //   // if (req.files && Array.isArray(req.files.coverImage)) {
// //   //   coverImageLocalPath = req.files.coverImage[0].path;
// //   // }
// //
// //
// //   const {fullName, email, username, password} = req.body;
// //   console.log(fullName, email, username, password);
// //
// //   if ([fullName, email, username, password].some((field) => field?.trim() == "")) {
// //     throw new APIError(400, "All fields are required");
// //   }
// //
// //   const existedUser = await User.findOne({
// //     $or: [{username}, {email}],
// //   });
// //
// //   if (existedUser) {
// //     throw new APIError(409, "User with email or username already exists");
// //   }
// //
// //   const avatarLocalPath = req.files?.avatar[0]?.path;
// //   let coverImageLocalPath;
// //   if (req.files && Array.isArray(req.files.coverImage)) {
// //     coverImageLocalPath = req.files.coverImage[0].path;
// //   }
// //
// //   if (!avatarLocalPath) {
// //     throw new APIError(400, "Avatar file is required");
// //   }
// //
// //   const avatar = await uploadOnCloudinary(avatarLocalPath);
// //   const coverImage = await uploadOnCloudinary(coverImageLocalPath);
// //
// //   if (!avatar) {
// //     throw new APIError(400, "Avatar file is required");
// //   }
// //
// //   const user = await User.create({
// //     fullName,
// //     avatar: avatar.url,
// //     coverImage: coverImage?.url || "",
// //     email,
// //     password,
// //     username: username.toLowerCase(),
// //   });
// //
// //   const createdUser = await User.findById(user._id).select(
// //       "-password -refreshToken"
// //   );
// //
// //   if (!createdUser) {
// //     throw new APIError(500, "Something went wrong while registering the user");
// //   }
// //   return res // Added response
// //       .status(201)
// //       .json(new APIResponse(201, createdUser, "User registered successfully"));
// // });
//
// // const loginUser = asyncHandler(async (req, res) => {
// //   // req body -> data
// //   // username or email
// //   // find the user
// //   // password
// //   // access and refresh Token
// //   // send cookies
// //
// //   const {email, username, password} = req.body;
// //
// //   if (!username && !email) {
// //     throw new APIError(400, "Username or Email is required");
// //   }
// //
// //   const user = await User.findOne({
// //     $or: [{username}, {email}],
// //   });
// //
// //   const isPasswordCorrect = await user.isPasswordCorrect(password);
// //   if (!isPasswordCorrect) {
// //     throw new APIError(400, "Invalid old password");
// //
// //   }
// //
// //
// //   const {accessToken, refreshToken} = await generateAccessAndRefreshToken(
// //       user._id
// //   );
// //
// //   //   get the user and ge tall details except password and refreshToken
// //   const loggedInUser = await User.findById(user._id).select(
// //       "-password -refreshToken"
// //   );
// //
// //   const options = {
// //     httpOnly: true,
// //     secure: true,
// //   };
// //
// //   return res
// //       .status(200)
// //       .cookie("accessToken", accessToken, options)
// //       .cookie("refreshToken", refreshToken, options) // Fixed cookie name
// //       .json(
// //           new APIResponse(
// //               200,
// //               {
// //                 user: loggedInUser,
// //                 accessToken,
// //                 refreshToken,
// //               },
// //               "User logged in SuccessFully"
// //           )
// //       );
// // });
//
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, username, password } = req.body;
//
//   // Validate input
//   if (!username && !email) {
//     throw new APIError(400, "Username or email is required");
//   }
//
//   // Find user
//   const user = await User.findOne({
//     $or: [{ username }, { email }],
//   });
//
//   if (!user) {
//     throw new APIError(404, "User not found");
//   }
//
//   // Verify password
//   const isPasswordCorrect = await user.isPasswordCorrect(password);
//   if (!isPasswordCorrect) {
//     throw new APIError(401, "Invalid password"); // Updated error message
//   }
//
//   // Generate tokens
//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
//
//   // Secure response
//   const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
//   const options = { httpOnly: true, secure: true };
//
//   return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json(
//           new APIResponse(
//               200,
//               { user: loggedInUser, accessToken, refreshToken },
//               "User logged in successfully"
//           )
//       );
// });
//
//
// const logout = asyncHandler(async (req, res) => {
//   // find the user and remove the refreshToken field from document
//   // clear the cookies
//   // send response
//   await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $unset: {
//           refreshToken: 1, // this will remove the refreshToken field from the user document
//         },
//       },
//       {
//         new: true,
//       }
//   );
//
//   const options = {
//     httpOnly: true,
//     secure: true,
//   };
//
//   return res
//       .status(200)
//       .clearCookie("accessToken", options)
//       .clearCookie("refreshToken", options)
//       .json(new APIResponse(200, {}, "User logged out successfully"));
// });


// Token generation utility
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(500, "Token generation failed");
  }
};

// Enhanced registration controller with file validation
const registerUser = asyncHandler(async (req, res) => {
  console.log(`[${new Date().toISOString()}] Entering registerUser controller`);

  // Input validation
  const { fullName, email, username, password } = req.body;
  console.log(`[${new Date().toISOString()}] Request body:`, {
    fullName,
    email,
    username: username?.toLowerCase()
  });

  if ([fullName, email, username, password].some((field) => !field?.trim())) {
    throw new APIError(400, "All fields are required");
  }

  // Check existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new APIError(409, "User with email or username already exists");
  }

  // File handling
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  console.log(`[${new Date().toISOString()}] Local files:`, {
    avatar: avatarLocalPath,
    coverImage: coverImageLocalPath
  });

  // Validate avatar file
  if (!avatarLocalPath) {
    throw new APIError(400, "Avatar file is required");
  }

  // File verification function
  const verifyLocalFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
      console.error(`File missing: ${filePath}`);
      throw new APIError(500, "Temporary file storage failed");
    }
    if (fs.statSync(filePath).size === 0) {
      console.error(`Empty file: ${filePath}`);
      throw new APIError(400, "Invalid file content");
    }
  };

  try {
    // Verify all files before upload
    verifyLocalFile(avatarLocalPath);
    if (coverImageLocalPath) verifyLocalFile(coverImageLocalPath);
  } catch (error) {
    // Cleanup files on validation error
    [avatarLocalPath, coverImageLocalPath].forEach(filePath => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    throw error;
  }

  // Cloudinary upload with enhanced error handling
  let avatar, coverImage;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) {
      throw new APIError(500, "Avatar upload failed");
    }

    if (coverImageLocalPath) {
      coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }
  } catch (uploadError) {
    // Cleanup Cloudinary assets if partial upload
    if (avatar?.public_id) await cloudinaryDelete(avatar.url);
    if (coverImage?.public_id) await cloudinaryDelete(coverImage.url);

    throw new APIError(500, `File upload failed: ${uploadError.message}`);
  }

  // Create user document
  try {
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken -__v");

    if (!createdUser) {
      throw new APIError(500, "User registration failed");
    }

    return res
        .status(201)
        .json(new APIResponse(201, createdUser, "User registered successfully"));
  } catch (dbError) {
    // Cleanup Cloudinary assets on DB failure
    if (avatar?.public_id) await cloudinaryDelete(avatar.url);
    if (coverImage?.public_id) await cloudinaryDelete(coverImage.url);

    throw new APIError(500, `Database error: ${dbError.message}`);
  }
});

// Login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const loginId = username || email;

  if (!loginId) {
    throw new APIError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username: loginId }, { email: loginId }],
  });

  if (!user) {
    throw new APIError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new APIError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id)
      .select("-password -refreshToken -__v");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new APIResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken
      }, "Login successful"));
});

// Logout controller
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new APIResponse(200, {}, "Logout successful"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  if (!incomingRefreshToken) {
    throw new APIError(400, "Refresh Token is required");
  }

  try {
    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new APIError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new APIError(401, "Invalid Refresh Token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const {accessToken, newRefreshToken} =
        await generateAccessAndRefreshToken(user._id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new APIResponse(
                200,
                {
                  accessToken,
                  refreshToken: newRefreshToken,
                },
                "Acess token refreshed successfully"
            )
        );
  } catch (error) {
    throw new APIError(401, error?.message || "Invalid Refresh Token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const {oldPassword, newPassword} = req.body;

  if (!oldPassword || !newPassword) {
    throw new APIError(400, "Old Password and New Password are required");
  }

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) { // Fixed condition
    throw new APIError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({validateBeforeSave: false}); // what is validated do

  return res
      .status(200)
      .json(new APIResponse(200, {}, "Password changes successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
      new APIResponse(
          200,
          {
            user: req.user,
          },
          "User details fetched successfully"
      )
  );
});

// const updateAccountDetails = asyncHandler(async (req, res) => {
//   const {fullName, email} = req.body;
//
//   if (!fullName || !email) {
//     throw new APIError(400, "FullName or Email are required");
//   }
//
//   const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         fullName,
//         email: email,
//       },
//       {
//         new: true,
//       }
//   ).select("-password -refreshToken");
// });

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new APIError(400, "FullName or Email are required");
  }

  const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, email },
      { new: true }
  ).select("-password -refreshToken");

  return res
      .status(200)
      .json(new APIResponse(200, updatedUser, "Account details updated successfully"));
});


export { registerUser, loginUser, logout, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails };