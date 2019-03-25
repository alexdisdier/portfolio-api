///////////////////
// PROJECT MODEL //
///////////////////

const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  title: String,
  subtitle: {
    type: Object,
    of: String
  },
  description: {
    type: Object,
    of: String
  },
  pictures: {
    type: Array,
    of: String
  },
  url: String,
  tags: {
    type: Array,
    of: String
  }
});

module.exports = Project;
