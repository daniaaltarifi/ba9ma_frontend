const path = require('path');

module.exports = {
  mode: 'production',  
  entry: './src/app.js',  
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',  
  },
  optimization: {
    usedExports: true, 
  },
};
