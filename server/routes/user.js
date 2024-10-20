const express = require('express');
const auth = require('../middleware/auth');
const Company = require('../models/Company');
const router = express.Router();

// Create a new company (user)
router.post('/companies', auth, async (req, res) => {
  const { name, address } = req.body;

  try {
    const company = new Company({
      name,
      address,
      createdBy: req.user.id, // Store the user who created it
    });

    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all companies created by the logged-in user
router.get('/companies', auth, async (req, res) => {
  try {
    const companies = await Company.find({ createdBy: req.user.id });
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
