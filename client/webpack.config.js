require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    compress: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
  },
};
