const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRegistration = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).send("unauthorised");
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userid = _id;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

const createQuiz = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).send("unauthorised");
  }

  try {
    const { _id, type } = jwt.verify(token, process.env.JWT_SECRET);
    if (type === "Teacher") {
      req.body.values.teacher_id = _id;
      next();
    } else res.status(403).send("Forbidden");
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

const giveQuiz = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).send("unauthorised");
  }

  try {
    const { _id, type } = jwt.verify(token, process.env.JWT_SECRET);
    if (type === "Student") {
      req.body.values.student_id = _id
      next();
    } else res.status(403).send("Forbidden");
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

const viewQuizResponse = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).send("unauthorised");
  }

  try {
    const { _id, type } = jwt.verify(token, process.env.JWT_SECRET);
    if (type === "Student") {
      req.body.id = _id
      next();
    } else res.status(403).send("Forbidden");
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

const viewCreatedQuizes = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).send("unauthorised");
  }

  try {
    const { _id, type } = jwt.verify(token, process.env.JWT_SECRET);
    if (type === "Teacher") {
      req.body.id = _id
      next();
    } else res.status(403).send("Forbidden");
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = { userRegistration, createQuiz, giveQuiz,viewQuizResponse,viewCreatedQuizes };
