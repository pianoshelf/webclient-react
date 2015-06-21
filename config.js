
module.exports = {

  ports: {
    webpack: 8080,
    express: 5092,
  },

  files: {
    js: {
      entry: './app/client.jsx',
      src: ['./app/**/*.js', './app/**/*.jsx'],
      out: 'bundle.js',
    },
    css: {
      entry: './assets/css/main.sass',
      src: './assets/css/**/*.sass',
      out: 'main.css',
    },
    images: {
      src: './assets/images/*',
    },
    out: './build/',
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

