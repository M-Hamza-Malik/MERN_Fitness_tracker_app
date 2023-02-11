const express = require("express");
const {
  createExercise,
  getExercises,
  getExercise,
  deleteExercise,
  updateExercise,
} = require("../controllers/exerciseController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all Exercise routes
router.use(requireAuth);

// GET all Exercises
router.get("/", getExercises);

//GET a single Exercise
router.get("/:id", getExercise);

// POST a new Exercise
router.post("/", createExercise);

// DELETE an Exercise
router.delete("/:id", deleteExercise);

// UPDATE an Exercise
router.patch("/:id", updateExercise);

module.exports = router;
