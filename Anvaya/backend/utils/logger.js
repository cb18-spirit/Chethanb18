const winston = require('winston');

// Define log levels
const logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red'
  }
};

// Create the logger
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    // Log to console with colorized output
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Optionally log to a file (e.g., 'app.log')
    new winston.transports.File({
      filename: 'app.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

// Set up custom log levels
winston.addColors(logLevels.colors);

module.exports = logger;
