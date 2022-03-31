const express = require('express');
const router = express.Router();
const db = require('../db/models');

router.get('/', async (req, res, next) => {
    try {
        const books = await db.Book.findAll({order: [['title', 'ASC']]});
        res.render('index', {title: 'Home', books});
    } catch (error) {
        next(error);
    }
    // // throw new Error('This is a test error!');
    // res.render('index',{title: 'Home'});
});

module.exports = router;
