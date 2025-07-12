const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const getuser = require("../middleware/getuser");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = config.auth.JWT_SECRET;

// Endpoint for login
router.post(
  "/login",
  [
    // Express validator validations.
    body("email", "Enter valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    // Express validator throws error if values are not matching.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructuring getting email and password from req.body .
    const { email, password } = req.body;
    let useremail = email.toLowerCase();
    try {
      // Fetching user from databse.
      let user = await User.findOne({ email: useremail });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      // Comparing password using bcryptjs.
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      // Compare authentication token using "jsonwebtoken".
      const authtoken = jwt.sign(data, JWT_SECRET);
      let usersend = await User.findById(data.user.id).select("-password");
      // Sending authentication token to user.
      res.json({ authtoken: authtoken, user: usersend, userid: data.user.id });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

router.post(
  "/adminlogin",
  [
    // Express validator validations.
    body("email", "Enter valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    // Express validator throws error if values are not matching.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destructuring getting email and password from req.body .
    const { email, password } = req.body;
    let useremail = email.toLowerCase();
    try {
      // Fetching user from databse.
      let user = await User.findOne({ email: useremail });
      if (!user) {
        return res
          .status(401)
          .json({ error: "Please try to login with correct credentials." });
      }

      // Comparing password using bcryptjs.
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(401)
          .json({ error: "Please try to login with correct credentials." });
      }

      if (!user.admin) {
        return res
          .status(401)
          .json({ error: "Please try to login with correct credentials." });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      // Compare authentication token using "jsonwebtoken".
      const authtoken = jwt.sign(data, JWT_SECRET);
      let usersend = await User.findById(data.user.id).select("-password");
      // Sending authentication token to user.
      res.json({ authtoken: authtoken, user: usersend, userid: data.user.id });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);
router.post("/adminverify", getuser, async (req, res) => {
  try {
    user_id = req.user.id;
    let user = await User.findById(user_id).select("-password");
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else if (!user.admin) {
      res.status(404).json({ msg: "User not found" });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Endpoint for signup
router.post(
  "/signup",
  [
    // Validate data
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be 8 characters.").isLength({ min: 8 }),
    body("name", "Enter name.").isLength({ min: 1 }),
  ],
  async (req, res) => {
    // Send errors if any error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Encrypting Password
    const salt = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      const username = await User.findOne({ username: req.body.username });
      const email = await User.findOne({ email: req.body.email });
      const password = req.body.password;
      const cpassword = req.body.passwordConfirm;
      if (username) {
        return res.status(400).json({ error: "Username already exist." });
      }
      if (email) {
        return res.status(400).json({ error: "Email already exist." });
      }
      if (password !== cpassword) {
        return res.status(400).json({ error: "Password dosen't match." });
      }

      // Converting email to lower case
      let useremail = req.body.email.toLowerCase();
      const authkay = uuidv4();
      const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: useremail,
        authkey: authkay,
        password: encryptedPassword,
      });

      // Getting user id to sign with JWT Token
      const data = {
        id: user.id,
      };

      // Signing authtoken
      const authtoken = jwt.sign(data, JWT_SECRET);
      res
        .status(200)
        .json({ authtoken: authtoken, authkey: authkay, userid: data.id });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error." });
    }
  }
);

router.post("/getuser", getuser, async (req, res) => {
  try {
    // getting user id
    user_id = req.user.id;

    // Finding user by id without password
    let user = await User.findById(user_id).select("-password");
    if (!user) {
      res.status(404).json({ msg: "User Not Found" });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
router.post("/changepassword", getuser, async (req, res) => {
  try {
    // getting user id
    user_id = req.user.id;
    const data = req.body;
    if (!data.newpassword) {
      return res.status(400).json({ msg: "Enter new password" });
    }
    if (!data.cnewpassword) {
      return res.status(400).json({ msg: "Confirm Password" });
    }
    if (data.newpassword !== data.cnewpassword) {
      return res.status(400).json({ msg: "Passwords dosen't match" });
    }
    // Finding user by id without password
    let user = await User.findById(user_id);
    if (!user) {
      res.status(404).json({ msg: "User Not Found" });
    } else {
      // Encrypting Password
      const salt = await bcrypt.genSalt(10);
      let encryptedPassword = await bcrypt.hash(data.newpassword, salt);
      user instanceof User;
      user.password = encryptedPassword;
      await user.save();
      res.json({ msg: "Password Updated" });
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/sendmail", async (req, res) => {
  try {
    // getting user id
    const data = req.body;
    // Finding user by id without password
    let user = await User.findById(data.user).select("-password");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.id,
        pass: config.email.password,
      },
    });

    var mailOptions = {
      from: config.email.id,
      to: user.email,
      subject: "Popcorn Account Verify",
      text: `${data.message}/${user.authkey}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        res.send("email sent");
      }
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/markverified", async (req, res) => {
  try {
    // getting user id
    const data = req.body;
    // Finding user by id without password
    let user = await User.findOne({ authkey: data.key });
    console.log(user);
    user instanceof User;
    user.verified = true;
    await user.save();
    res.send({ msg: "Account Verified" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
