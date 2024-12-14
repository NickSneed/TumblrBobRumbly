const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      alias: {
        'masonry': 'masonry-layout',
        'imagesloaded': 'imagesloaded',
        'infinite-scroll': 'infinite-scroll'
      }
    }
};