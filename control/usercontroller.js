import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import CatchAsync from "../utils/CatchAsync.js";
import { confirmPassword } from "../helper/index.js";
import signToken from "../utils/signToken.js"
import createToken from "../utils/createToken.js";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
    try {
      //validate the user input
      const { username, email, password } = req.body; //desctructuring
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Please fill all the fields",
        })
    }
    
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(500).json({
          message: "Invalid email",
        });
      }
      const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "Email already registered, login instead",
      });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        
  
        res.status(201).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const loginUser = CatchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new Error("Please provide email and password", 400));
      }
  
      const checkEmail = await User.findOne({ email });
      if (!checkEmail) {
        return next(new Error("User not found, please register", 404));
      }
  
      const isPasswordCorrect = await confirmPassword(
        password,
        checkEmail.password
      );
      if (!isPasswordCorrect) {
        return next(new Error("Invalid credentials", 400));
      }
  
      const token = signToken({ id: checkEmail._id });
      res.status(200).json({
        success: true,
        data: {
          user: checkEmail,
          token,
        },
      });
    } catch (error) {
      console.log("login error", error);
      return next(new Error("Error Logging In", 500));
    }
  });
  
  export const registerUser = async (req, res) => {
    try {
      //validate the user input
      const { username, email, password } = req.body; //desctructuring
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Please fill all the fields",
        });
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(500).json({
          message: "Invalid email",
        });
      }
      //check for existing user
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({
          message: "Email already registered, login instead",
        });
      }
  
      //TODO HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
  
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = User({ username, email, password: hashedPassword });
  
      try {
        await newUser.save();
        //create a token
        createToken(res, newUser._id);
  
        res.status(201).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  export const loginUser2 = CatchAsync(async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );
  
        if (isPasswordValid) {
          const token = createToken(res, existingUser._id);
  
          res.status(200).json({
            _id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            token,
          });
          return;
        }
      }else{
          res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.log(error);
      throw new Error("error loggin in");
    }
  });

  export const logoutCurrentUser = CatchAsync(async (req, res) => {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({
        message: "User logged out successfully",
      });
    } catch (error) {
      console.log(error);
      throw new Error("Internal Server Error");
    }
  });
  
  export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  };
    export const getCurrentUserProfile = CatchAsync(async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (user) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        res.status(404);
        throw new Error("user not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("User not found, error updating profile");
    }
  });
  
  export const updateCurrentUserProfile = CatchAsync(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
  
  
        console.log('i got here first')
        if (req.body.password) {
          console.log('i got here')
          const salt = await bcrypt.genSalt(10);
          console.log('alost there')
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          console.log('hash',hashedPassword);
          user.password = hashedPassword;
        }
  
        const updatedUser = await user.save();
        res.json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        });
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("user not found, error updating user");
    }
  });

  export const deleteUserById = CatchAsync(async(req, res) => {
    try{
      const user = await User.findById(req.params.id);
  
      //console.log('founduser', user);
      if(user){
        if(user.isAdmin){
          res.status(400).json({message: 'Cannot delete admin user'})
        }
        await User.deleteOne({_id:user._id});
        res.json({message: 'User deleted successfully'})
      }else{
        res.status(404).json({message: 'User not found'})
      }
  
    }catch(error){
      console.log(error)
      throw new Error("User not found by admin")
    }
  })
  export const getUserById = CatchAsync(async(req, res) => {
    try{
      const user = await User.findById(req.params.id).select("-password")
      
      if(user){
        res.json(user)
      }else{
        res.status(404).json({message: 'User not found'})
        throw new Error('user not found')
      }
  
    }catch(error){
      console.log(error)
      throw new Error("User not found")
    }
  })