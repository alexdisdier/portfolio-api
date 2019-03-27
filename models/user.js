const mongoose = require("mongoose");

const User = mongoose.model("User", {
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  socialNetworks: {
    type: Array,
    of: Object
  },
  description: {
    type: Object,
    of: String
  },
  subtitle: {
    type: Object,
    of: String
  },
  contactText: {
    type: Object,
    of: String
  },
  profile: String,
  token: {
    type: String,
    maxLength: 17,
    required: true
  },
  salt: {
    type: String,
    maxLength: 17,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});

module.exports = User;
