const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('it works');
});
router.get('/dashboard', (req, res) => {
    res.send('dashboard');
});

module.exports = router;