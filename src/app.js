const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port= 3000
const app = express();

app.use(cors());
app.set('port',port);

app.use(express.json());

app.use(morgan("dev"));

app.use('/api', require('./routes/tienda.routes'));

module.exports = app;