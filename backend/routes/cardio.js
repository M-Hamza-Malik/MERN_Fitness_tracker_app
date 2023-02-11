const express = require("express");
const {
  getCardios,
  getCardio,
  createCardio,
  deleteCardio,
  updateCardio,
} = require("../controllers/cardioController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

router.post("/", createCardio);

router.get("/", getCardios);

module.exports = router;
