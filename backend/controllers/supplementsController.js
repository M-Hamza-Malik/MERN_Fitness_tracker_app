const Supplements = require("../models/supplementsModel");
const mongoose = require("mongoose");

// get all workouts
const getSupplements = async (req, res) => {
  const user_id = req.user._id;

  const supplements = await Supplements.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(supplements);
};

// get a single workout
const getSupplement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const supplement = await Supplements.findById(id);

  if (!supplement) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
const createSupplement = async (req, res) => {
  const { title, dosage } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!dosage) {
    emptyFields.push("dosage");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const supplement = await Supplements.create({ title, dosage, user_id });
    res.status(200).json(supplement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteSupplement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such supplement" });
  }

  const supplement = await Supplements.findOneAndDelete({ _id: id });

  if (!supplement) {
    return res.status(400).json({ error: "No such supplement" });
  }

  res.status(200).json(supplement);
};

// update a workout
const updateSupplement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such supplement" });
  }

  const supplement = await Supplements.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!supplement) {
    return res.status(400).json({ error: "No such supplement" });
  }

  res.status(200).json(supplement);
};

module.exports = {
  getSupplements,
  getSupplement,
  createSupplement,
  deleteSupplement,
  updateSupplement,
};
