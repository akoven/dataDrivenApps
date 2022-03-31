const express = require('express');
const router = express.Router();
const db = require('../db/models');

const aysncHandler = (handler) =>
 (req, res, next) => handler(req, res, next).catch(next);

router.get('/', aysncHandler(async (req, res) => {
        const books = await db.Book.findAll({order: [['title', 'ASC']]});
        res.render('book-list', {title: 'Books', books});


    // // throw new Error('This is a test error!');
    // res.render('index',{title: 'Home'});
}));

module.exports = router;
