const express = require('express');
const router = express.Router();
const { registerUser, authUser, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Admin routes
router.route('/').get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;

