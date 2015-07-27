
module.exports = {

  ports: {
    webpack: 8080,
    express: 5092,
    django: 5000,
  },

  files: {
    client: {
      entry: './app/client.jsx',
      src: ['./app/**/**/**/**/*.js', './app/**/**/**/**/*.jsx'],
      out: 'js',
      outFile: 'bundle.js',
    },
    css: {
      entry: './assets/css/main.sass',
      src: './assets/css/**/**/*.sass',
      out: 'css',
    },
    images: {
      src: './assets/images/*',
      out: 'img',
    },
    server: {
      src: ['./app/**/**/**/*.js', './app/**/**/**/*.jsx'],
      out: 'build',
    },
    staticAssets: 'build/static/',
  },

  api: {
    // The reason this is separated is so that later on, we can switch to a dedicated API subdomain
    // easily, i.e https://api.pianoshelf.com.
    prod: {
      prefix: '/api',
      authPrefix: '/api-auth',
    },
    dev: {
      prefix: '/api',
      authPrefix: '/api-auth',
    },
  },

  facebook: {
    appId: '1549195551980295',
  },

  cookie: {
    authtoken: 'pianoshelf-authtoken',
    csrf: 'csrftoken',
  },

  babelOptions: {
    stage: 0,
    plugins: ['jsx-control-statements/babel'],
    loose: 'all',
    blacklist: 'regenerator',
  },

};

