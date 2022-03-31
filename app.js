const express = require('express');
const morgan = require('morgan');

const routes = require('./routes/routes');


const app = express();
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(routes);

// const port = 8080;

// app.listen(port, () => console.log(`listening on port ${port}...`));

module.exports = app;
