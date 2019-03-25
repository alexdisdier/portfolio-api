///////////////////
// PROJECT ROUTE //
///////////////////

const express = require("express");
const router = express.Router();

const Project = require("../models/project");

// CREATE
// params body: title, subtitle(fr, en), description(fr, en), tags
router.post("/project/create", async (req, res, next) => {
  try {
    const existingProject = await Project.findOne({
      title: req.body.title
    });

    if (existingProject === null) {
      const newProject = new Project({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        pictures: req.body.pictures,
        url: req.body.url,
        tags: req.body.tags
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
router.get("/project/read", async (req, res) => {
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
