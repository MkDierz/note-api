require('dotenv').config();

const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const swaggerFile = require('./swagger.json');
const authRouter = require('./src/auth.routes');
const noteRouter = require('./src/note.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api', authRouter);
app.use('/api', noteRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
