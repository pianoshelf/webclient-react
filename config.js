
module.exports = {

  server: {
    dev: {
      port: 8000,
    },
    webpack: {
      port: 8080,
    },
  },


  api: {
    prod: {
      prefix: 'https://www.pianoshelf.com/api',
      authPrefix: 'https://www.pianoshelf.com/api-auth',
    },
    dev: {
      prefix: 'http://localhost:5000/api',
      authPrefix: 'http://localhost:5000/api-auth',
    },
  },


  cookie: {
    authtoken: 'pianoshelf-authtoken',
    csrf: 'csrftoken',
  },

};

