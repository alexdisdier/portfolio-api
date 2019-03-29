///////////////////
// PROJECT ROUTE //
///////////////////

const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
// const uploadPictures = require("../middlewares/uploadPictures");

const Project = require("../models/project");

// CREATE
// params body: title, subtitle(fr, en), overview(fr, en), features(fr, en), technologies, pictures, url, code, creator
router.post("/project/create", isAuthenticated, async (req, res, next) => {
  try {
    const existingProject = await Project.findOne({
      title: req.body.title
    });

    if (existingProject === null) {
      const newProject = new Project({
        title: req.body.title,
        duration: req.body.duration,
        subtitle: req.body.subtitle,
        overview: req.body.overview,
        features: req.body.features,
        technologies: req.body.technologies,
        pictures: req.body.pictures,
        url: req.body.url,
        code: req.body.code,
        creator: req.user
      });

      await newProject.save();

      res.json({
        message: `New Project created`,
        newProject
      });
    } else {
      res.status(400).json({
        error: {
          message: "Project already exists"
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    });
  }
});

// READ
// params query: title, subtitle(fr, en), description(fr, en), tags
router.get("/projects", async (req, res) => {
  try {
    const search = await Project.find();

    res.json(search);
  } catch (error) {
    res.status(400).json({
      error: {
        message: error.message
      }
    });
  }
});

module.exports = router;
