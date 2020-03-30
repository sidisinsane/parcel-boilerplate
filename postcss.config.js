module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        grid: true,
        flexbox: 'no-2009'
      },
      // https://cssdb.org/#staging-process
      stage: 3,
      features: {
        'custom-properties': false
      }
    }
  }
};
