const express = require('express');
const auth = require('../middleware/auth');
const Company = require('../models/Company');
const User = require('../models/User');
const router = express.Router();

// Get all companies with creator info (admin only)
router.get('/companies', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    // Populate createdBy field with the user's details
    const companies = await Company.find().populate('createdBy', ['name', 'email']);
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Edit a company (admin only)
router.put('/companies/:id', auth, async (req, res) => {
    const { name, address } = req.body; // Get name and address from request body
  
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' }); // Ensure only admin can edit
      }
  
      let company = await Company.findById(req.params.id); // Find company by ID
      if (!company) {
        return res.status(404).json({ msg: 'Company not found' }); // Handle company not found
      }
  
      // Update company fields
      company.name = name || company.name;
      company.address = address || company.address;
  
      await company.save(); // Save the updated company
      res.json({ msg: 'Company updated', company }); // Return updated company
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Delete a company (admin only)
router.delete('/companies/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    await company.remove();
    res.json({ msg: 'Company deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Approve a company (admin only)
router.post('/companies/:id/approve', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    company.approved = true;
    await company.save();
    res.json({ msg: 'Company approved', company });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/companies', auth, async (req, res) => {
    const { name, address } = req.body; // Get company name and address from request body
  
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' }); // Only admin can create companies
      }
  
      // Create a new company with approved status set to true by default
      const newCompany = new Company({
        name,
        address,
        approved: true,  // Set approved to true by default
        createdBy: req.user.id  // Admin who creates the company
      });
  
      const company = await newCompany.save(); // Save the company in the database
      res.json({ msg: 'Company created', company }); // Return the new company
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  // Search companies by name or createdBy (admin only)
router.get('/companies/search', auth, async (req, res) => {
    const { name, createdBy } = req.query;  // Get query parameters for name and createdBy
  
    try {
      let query = {};
  
      // If a company name is provided, add it to the query
      if (name) {
        query.name = { $regex: name, $options: 'i' };  // Case-insensitive search using regex
      }
  
      // If a createdBy (login ID) is provided, add it to the query
      if (createdBy) {
        query['createdBy.email'] = { $regex: createdBy, $options: 'i' };  // Case-insensitive search for email
      }
  
      const companies = await Company.find(query).populate('createdBy', ['name', 'email']);  // Populate createdBy field with user details
  
      res.json(companies);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
module.exports = router;
