const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplementsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplement", supplementsSchema);
