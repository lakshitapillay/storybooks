const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated , ensureGuest} = require('../helpers/auth');
const story = require('../models/Story');

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

router.get('/dashboard',ensureAuthenticated, (req, res) => {
    story.find({user:req.user.id})
        .then(stories => {
            res.render('index/dashboard', {
                stories:stories
            });
        });
});

module.exports = router;