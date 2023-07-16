const { environment } = require('@rails/webpacker');
const webpack = require('webpack');

// Add an additional plugin of your choosing : ProvidePlugin is an example
environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default'],
  })
);

// Expose jQuery to global scope (for Bootstrap)
environment.plugins.prepend(
  'expose',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  })
);

// Ignore moment.js locales
environment.plugins.append(
  'Ignore',
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  })
);
module.exports = environment;
