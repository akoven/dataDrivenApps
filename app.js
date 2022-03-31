const express = require('express');
const morgan = require('morgan');

const routes = require('./routes/routes');


const app = express();
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(routes);

// catch unhandled requests and forward to error handler
app.use((req, res, next) => {
    const error = new Error('The requested page couldn\'t be found.');
    error.status = 404;
    next(error);
});

//custom error handlers

//error handler to log errors
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        //TODO log the error to the database
    } else {
        console.error(error);
    }
    next(error);
});

// handle 404 errors
app.use((error, req, res, next) => {
    if (error.status === 404) {
        res.status(404);
        res.render('page-not-found', { title: 'Page Not Found'});
    } else {
        next(error);
    }
});

// generic error handling

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    const isProduction = process.env.NODE_ENV === 'production';
    res.render('error', {
        title: 'Server Error',
        message: isProduction ? null : error.message,
        stack: isProduction ? null : error.stack,
    });
});

// const port = 8080;

// app.listen(port, () => console.log(`listening on port ${port}...`));

module.exports = app;
