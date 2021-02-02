
const path = require('path');

module.exports = function (api) {
  api && api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    [
      'module-resolver',
      {
        'root': ["./src/"],
        // 'extensions': [".js", ".ios.js", ".android.js"],
        'alias': {
          '@': './src/',
        }
      }
    ]
  ]
  };
};
