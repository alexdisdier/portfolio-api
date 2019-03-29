require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/", cors());

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/portfolio`, {
  useNewUrlParser: true
});

////////////////////////
// ROUTES DECLARATION //
////////////////////////

app.get("/", (req, res) => {
  res.send({
    home: {
      message: "Welcome to AD API",
      projectsRoute: "/projects"
    }
  });
});

const projectRoutes = require("./routes/project");
const userRoutes = require("./routes/user");
const sendMail = require("./routes/sendMail");

app.use(projectRoutes);
app.use(userRoutes);
app.use(sendMail);

/////////////////////
// STARTING SERVER //
/////////////////////

app.all("*", function(req, res) {
  res.status(404).send("Page not found");
});

app.use(function(err, req, res, next) {
  if (res.statusCode === 200) res.status(400);
  console.log(err);
  res.json({ error: err });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server started");
});
