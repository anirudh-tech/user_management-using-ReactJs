const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  fetchUsers: async (req, res) => {
    try {
      const users = await User.find({role:"user"});
      if (users) {
        res.status(201).json({ status: "ok", users });
      } else {
        res.json({ status: "error", message: "users not found" });
      }
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
  },

  saveUser: async (req,res) => {
    try {
      const { id } = req.params;
      const email  = req.body.editedEmail;
      const username = req.body.editedName;

      const existingUser = await User.findOne({ email: email, _id: { $ne: id } });
      if (existingUser) {
        return res.json({ status: "error", message: "Email is already in use" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username: username, email: email },
        { new: true }
      );

      if (updatedUser) {
        res.status(201).json({ status: "ok", user: updatedUser });
      } else {
        res.json({ status: "error", message: "User not found" });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
      }

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }

      res.status(200).json({ status: 'ok', message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  },

  addUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await User.create({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toLocaleString(),
        role: "user"
      })
      if (!data) {
        res.json({ status: "error", message: "database error" });
        return;
      }
      res.status(201).json({status: 'ok', data: {username: data.username, userId: data._id , role: data.role }})
    } catch (error) {
      if(error.code === 11000) {
        res.json({status:"error", message: "Email already exist"})
    }else{
        res.json({status:"error", message: `${error.message}`})
    }
    }
  }
};
