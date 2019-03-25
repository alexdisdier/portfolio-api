////////////////
// USER ROUTE //
////////////////

const express = require("express");
const router = express.Router();

const User = require("../models/user");

// CREATE
// Params body: firstname, lastname, email, phone, socialNetworks (name && url), description
router.post("/user/create", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const socialNetworks = req.body.socialNetworks;
    const description = req.body.description;

    if (
      firstname &&
      lastname &&
      email &&
      phone &&
      socialNetworks &&
      description
    ) {
      const user = new User({
        firstname: firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        socialNetworks: req.body.socialNetworks,
        description: req.body.description
      });
      await user.save();
      res.json(user);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// READ
router.get("/user/read", async (req, res) => {
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
