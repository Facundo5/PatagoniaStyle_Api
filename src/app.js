const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000
const app = express();

app.use(cors());
app.set('port', port);

app.use(express.json());

app.use(morgan("dev"));
app.use('/api', require('./routes/users.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/admin.routes'));
app.use('/api', require('./routes/payment.routes'));

module.exports = app;