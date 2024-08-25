const express = require('express');
const router = express.Router();
const { createAuction, getAllAuctions, bidOnAuction, endAuction } = require('../controllers/auctionController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Admin routes
router.route('/').post(protect, admin, createAuction);
router.route('/:id/end').put(protect, admin, endAuction);

// User & Admin routes
router.route('/').get(protect, getAllAuctions);
router.route('/bid').post(protect, bidOnAuction);

module.exports = router;
