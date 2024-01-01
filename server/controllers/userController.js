const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports = {
  postSignup: async (req, res) => {
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
      const accessToken = jwt.sign(
        { username: username, userId: data._id, role: data.role  },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );
      res.cookie("userJwt", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(201).json({status: 'ok', data: {username: data.username, userId: data._id , role: data.role }})
    } catch (error) {
        if(error.code === 11000) {
            res.json({status:"error", message: "Email already exist"})
        }else{
            res.json({status:"error", message: `${error.message}`})
        }
    }
  },

  getDetails: async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({_id: userId})
        if(user) {
            res.status(201).json({status: 'ok', data: {user}})
        }else {
            res.json({status:"error", message: "Email already exist"})
        }
    } catch (error) {
        res.json({status:"error", message: `${error.message}`})
    }
  },

  getAuth: async (req, res) => {
      const token = req.cookies.userJwt
      if(token) {
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
              if(err) {
                  res.json({status: "error", message: err})
                } else {
                    res.status(200).json({status: 'ok', data: user})
                }
            })
        } else {
        res.json({status:"error", message: "cnnot verify jwt"})
    }
  },

  postLogin : async (req,res) => {
    console.log(req.body)
    const {email, password} = req.body
    try {
        const user = await User.findOne({email:email});
        if (!user) {
            res.json({ status: "error", message: "Email doesn't exist" });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({ status: "error", message: "Email or password is incorrect" });
            return;
        }
        const accessToken = jwt.sign(
            { username: user.username, userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 * 60 * 24 }
          );
          res.cookie("userJwt", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
          });
          res.status(201).json({status: 'ok', data: {username: user.username, userId: user._id, role: user.role }})
    } catch (error) {
        if (error.code === 11000) {
            res.json({ status: 'error', message: "Email already exist" });
        } else {
            res.json({ status: 'error', message: error.message });
        }
    }
  },

  imageUpload : async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({_id: userId})
        if(user) {
            const newUser = await User.findByIdAndUpdate(user._id,{image: req.file.filename},{new: true})
            res.status(201).json({status: 'ok', data: newUser})
        } else {
            res.json({ status: 'error', message: "User not found" });
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
  },

  logout : (req,res) => {
    res.clearCookie("userJwt");
    res.status(200).json({status:'ok'});
  }
};
