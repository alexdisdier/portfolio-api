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
  }
});

module.exports = User;
