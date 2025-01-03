const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    mode: 'production',
    output: {
        filename: '[name].js',
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