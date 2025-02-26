module.exports = {
    extends: ['react-app', 'react-app/jest'],
    rules: {
      'no-unused-vars': [
        'warn', 
        {
          vars: 'all',
          args: 'after-used',
        }
      ]
    }
  };