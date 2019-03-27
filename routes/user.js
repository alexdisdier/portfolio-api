////////////////
// USER ROUTE //
////////////////

const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/user");
const isAuthenticated = require("../middlewares/isAuthenticated");

// CREATE
// Params body: firstname, lastname, email, password, phone, socialNetworks (name && url), description (fr, en), subtitle (fr, en), contactText( fr, en)
router.post("/user/create", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const phone = req.body.phone;
    const socialNetworks = req.body.socialNetworks;
    const description = req.body.description;
    const subtitle = req.body.subtitle;
    const contactText = req.body.contactText;
    const profile = req.body.profile;

    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const userExist = await User.findOne({ email: email });

    if (userExist !== null) {
      res.json({
        error: "email already exists"
      });
    } else {
      if (
        firstname &&
        lastname &&
        email &&
        phone &&
        socialNetworks &&
        description &&
        password
      ) {
        const user = new User({
          firstname: firstname,
          lastname: lastname,
          email: email,
          token: token,
          salt: salt,
          hash: hash,
          phone: phone,
          socialNetworks: socialNetworks,
          description: description,
          subtitle: subtitle,
          contactText: contactText,
          profile: profile
        });
        await user.save();
        res.json({ _id: user._id, token: user.token, email: user.email });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// READ
router.get("/user/read", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    const count = await User.countDocuments();

    if (count > 0) {
      res.json({
        users
      });
    } else {
      res.json({
        message: "no users in the database"
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
