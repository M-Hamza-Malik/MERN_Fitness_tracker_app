const express = require("express");
const {
  createSupplement,
  getSupplements,
  getSupplement,
  deleteSupplement,
  updateSupplement,
} = require("../controllers/supplementsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all supplement routes
router.use(requireAuth);

// GET all supplements
router.get("/", getSupplements);

//GET a single supplement
router.get("/:id", getSupplement);

// POST a new supplement
router.post("/", createSupplement);

// DELETE a supplement
router.delete("/:id", deleteSupplement);

// UPDATE a supplement
router.patch("/:id", updateSupplement);

module.exports = router;
