if (process.env.NODE_ENV === 'production') {
  module.exports = require('./DevTools.prod');
} else {
  // Use prod for now
  module.exports = require('./DevTools.prod');
}
