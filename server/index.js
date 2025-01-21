require('dotenv').config({ path: './config.env' });
const express = require('express');
const app = express();
const db = require('./config/db');
const PORT = process.env.PORT || 3000;
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1); // Mandatory (as per the Node.js docs)
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const corsOptions = {
  origin: ['https://www.ucspyay.site', 'https://ucspyay.site'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(limiter);

app.use(
  express.static(path.join(__dirname, 'public'), {
    etag: true,
  })
);

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

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // To exit with a 'failure' code
});

module.exports = app;
