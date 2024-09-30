import express from "express"
import { createUser, registerUser, loginUser, loginUser2, logoutCurrentUser, getAllUsers, updateCurrentUserProfile,getCurrentUserProfile, deleteUserById, getUserById } from "../control/usercontroller.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";
const userRouter = express.Router();

userRouter.get('/getAll', getAllUsers);
userRouter.post('/logout-user', logoutCurrentUser);
userRouter.post('/login-user', loginUser2);
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/register1',  createUser)
userRouter.get('/getProfile', authenticate, getCurrentUserProfile);
userRouter.delete("/:id", authenticate, authorizeAdmin, deleteUserById);
userRouter.get('/get-user/:id', authenticate, getUserById);
userRouter.put('/updateProfile', authenticate, updateCurrentUserProfile);
userRouter.post('/register',  (req, res)=>{
return res.status(201).json({
    message:"user registered successfully",
    success:"true"

})
    
})

export default userRouter;




