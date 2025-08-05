const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#3b82f6',
              '@success-color': '#10b981',
              '@warning-color': '#f59e0b',
              '@error-color': '#ef4444',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};