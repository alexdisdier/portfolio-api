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
    const socialMedia = req.body.socialMedia;
    const cv = req.body.cv;
    const description = req.body.description;
    const subtitle = req.body.subtitle;
    const contactText = req.body.contactText;
    const profile = req.body.profile;

    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    // const userExist = await User.findOne({ email: email });
    const count = await User.countDocuments();
    console.log(count);

    if (count > 0) {
      res.json({
        error: "only one account allowed, mine"
      });
    } else {
      if (
        firstname &&
        lastname &&
        email &&
        phone &&
        socialMedia &&
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
          socialMedia: socialMedia,
          cv: cv,
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
router.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    const count = await User.countDocuments();
    const me = user[0];

    if (count > 0) {
      res.json({
        firstname: me.firstname,
        lastname: me.lastname,
        email: me.email,
        socialMedia: me.socialMedia,
        cv: me.cv,
        description: me.description,
        subtitle: me.subtitle,
        contactText: me.contactText,
        profile: me.profile
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
