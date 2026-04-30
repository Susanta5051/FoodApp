import express from "express";
import { sign } from "node:crypto";

import { checkAuth, forgotPassword, login, logout, register, resetPassword, updateProfile, verifyEmail , findUserById, removeCartItem , increaseCartItem ,decreaseCartItem } from "../controller/user.controller.ts";
import { isAuthenticated } from "../middlewares/isAuthenticated.ts";
import upload from "../middlewares/multer.ts";

const userRouter  =  express.Router();
userRouter.route("/check-auth").get(isAuthenticated , checkAuth);
userRouter.route("/register").post(upload.single("profilePicture"),register);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/verify-email").post(verifyEmail);
userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").post(resetPassword);
userRouter.route("/profile-update").put(isAuthenticated,updateProfile);
userRouter.route("/find").get(isAuthenticated, findUserById);
userRouter.route("/cart/increase").patch(isAuthenticated,increaseCartItem);
userRouter.route("/cart/decrease").patch(isAuthenticated,decreaseCartItem);
userRouter.route("/cart/remove").patch(isAuthenticated,removeCartItem);
export default userRouter;