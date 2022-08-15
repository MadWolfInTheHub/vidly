const winston = require("winston");

module.exports = function(err, req, res, next) {
  // log an exemption

  // winston.log('error', err.message);
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbals
  // debug
  // silly

  res.status(500).send('Smt failed.');
};