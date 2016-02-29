if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  // Use prod for now
  module.exports = require('./configureStore.prod');
}
