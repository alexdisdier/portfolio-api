///////////////////
// PROJECT MODEL //
///////////////////

const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  title: String,
  duration: String,
  subtitle: {
    type: Object,
    of: String
  },
  overview: {
    type: Object,
    of: String
  },
  features: {
    type: Object,
    of: String
  },
  technologies: {
    type: Array,
    of: String
  },
  pictures: {
    type: Array,
    of: String
  },
  url: String,
  code: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Project;
