const Cardio = require("../models/CardioModel");
const mongoose = require("mongoose");

// get all Cardios
const getCardios = async (req, res) => {
  const user_id = req.user._id;

  const cardio = await Cardio.find({ user_id }).sort({ createdAt: -1 });
  console.log(cardio);
  res.status(200).json(cardio);
};

// get a single workout
const getCardio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const cardio = await Cardio.findById(id);

  if (!cardio) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(cardio);
};

// create new workout
const createCardio = async (req, res) => {
  const { title, reps, duration } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!reps) {
    emptyFields.push("reps");
  }
  if (!duration) {
    emptyFields.push("duration");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const cardio = await Cardio.create({ title, reps, duration, user_id });
    res.status(200).json(cardio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteCardio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const cardio = await Cardio.findOneAndDelete({ _id: id });

  if (!cardio) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(cardio);
};

// update a workout
const updateCardio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const cardio = await Cardio.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!cardio) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(cardio);
};

module.exports = {
  getCardios,
  getCardio,
  createCardio,
  deleteCardio,
  updateCardio,
};
