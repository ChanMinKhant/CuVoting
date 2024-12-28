require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const db = require('./config/db');
const PORT = process.env.PORT || 3000;
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const mongoSanitize = require('express-mongo-sanitize');
// const expressRateLimit = require('express-rate-limit');

app.use(express.json());
app.use(cookieParser());
//from local host 5173
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(mongoSanitize());
// app.use(
//   expressRateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100,
//   })
// );

app.use('/api', router);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(require('./controllers/error.js'));

const startServer = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Mandatory (as per the Node.js docs)
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // To exit with a 'failure' code
});
