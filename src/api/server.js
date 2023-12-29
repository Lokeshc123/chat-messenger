const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport"); // authencication millerware
const LocalStrategy = require("passport-local").Strategy; // handling local usrname password inside app

mongoose
  .connect(
    "mongodb+srv://lokeshchauhan629:Lokesh123@cluster0.wdnkaue.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");
app.listen(3000, () => {
  console.log("Server started!");
});

const User = require("./model/user");
const Message = require("./model/message");

// endpoint for signup

app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  // create new user

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    image: image,
  });

  // save the user to database

  newUser
    .save()
    .then((user) => {
      res
        .status(200)
        .json({ message: "User Created Successfully", user: user });
    })
    .catch((err) => {
      res.status(500).json({ message: "User Creation Failed", error: err });
    });
});
//function to create token
const createToken = (userId) => {
  // set token payload
  const payload = {
    userId: userId,
  };

  // create token
  const token = jwt.sign(payload, "Q$%&*()!@#$%^&*()_+", { expiresIn: "1h" });
  return token;
};

// endpint for login

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // check if the email and password is provided

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password Required" });
  }
  // check for the user with the email

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      }
      // check for the password
      if (user.password != password) {
        res.status(400).json({ message: "Invalid Password" });
      }
      const token = createToken(user._id);
      res.status(200).json({ message: "Login Successfull", token: token });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Login Failed", error: err });
    });
});
