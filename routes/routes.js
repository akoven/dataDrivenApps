const express = require('express');
const router = express.Router();
const db = require('../db/models');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const csrfProtection = csrf({cookie: true});
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const titleValidator = check('title')
  .exists({ checkFalsy: true })
  .withMessage("Please provide a value for Title")
  .isLength({ max: 255})
  .withMessage('Title must not be more than 255 characters long');

const authorValidator = check('author')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Author')
    .isLength({ max: 100 })
    .withMessage('Author must not be more than 100 characters long');

const releaseDateValidator =   check('releaseDate')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Release Date')
    .isISO8601()
    .withMessage('Please provide a valid date for Release Date');

const pageCountValidator =   check('pageCount')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Page Count')
    .isInt({ min: 0 })
    .withMessage('Please provide a valid integer for Page Count');

const publisherValidator =   check('publisher')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Publisher')
    .isLength({ max: 100 })
    .withMessage('Publisher must not be more than 100 characters long');

const bookValidators = [
    titleValidator,
    authorValidator,
    pageCountValidator,
    releaseDateValidator,
    publisherValidator,
];

router.get('/', asyncHandler(async (req, res) => {
        const books = await db.Book.findAll({order: [['title', 'ASC']]});
        res.render('book-list', {title: 'Books', books});

    // // throw new Error('This is a test error!');
    // res.render('index',{title: 'Home'});
}));

router.get('/book/add', csrfProtection, (req, res) =>{
    const book = db.Book.build();
    console.log(book);
    res.render('book-add', {
        title: 'Add Book',
        book,
        csrfToken: req.csrfToken(),
    });
});

router.get('/book/edit/:id(\\d+)', csrfProtection,
    asyncHandler(async (req, res) => {
        const bookId = parseInt(req.params.id, 10);
        const book = await db.Book.findByPk(bookId);
        res.render('book-edit', {
            title: 'Edit Book',
            book,
            csrfToken: req.csrfToken(),
        });
    })
);

router.post('/book/add', csrfProtection, bookValidators, asyncHandler(async(req, res, next) =>{
    const{
        title,
        author,
        releaseDate,
        pageCount,
        publisher,
    } = req.body;

    const book = db.Book.build({
        title,
        author,
        releaseDate,
        pageCount,
        publisher,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await book.save();
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('book-add', {
            title: 'Add Book',
            book,
            errors,
            csrfToken: req.csrfToken(),
        });
    }
}));

router.post('/book/edit/:id/(\\d+)', csrfProtection, bookValidators,
    asyncHandler(async (req, res) => {
        const bookId = parseInt(req.params.id, 10);
        const bookToUpdate = await db.Book.findByPk(bookId);

        const{
            title,
            author,
            releaseDate,
            pageCount,
            publisher
        } = req.body;

        const book = {
            title,
            author,
            releaseDate,
            pageCount,
            publisher,
        };

        const validationErrors = validationResult(req);

        if(validationErrors.isEmpty()){
            await bookToUpdate.update(book);
            res.redirect('/');
        } else{
            const errors = validationErrors.array().map(error => error.msg);
            res.render('book-edit', {
                title: 'Edit Book',
                book: { ...book, id: bookId},
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));

module.exports = router;
