module.exports = {
    extends: [
      'react-app', 
      'react-app/jest', 
      'plugin:jsx-a11y/recommended'
    ],
    plugins: ['jsx-a11y'],
    rules: {
      // Desactivar o relajar reglas específicas
      'no-unused-vars': 'off', // Desactivar completamente
      '@typescript-eslint/no-unused-vars': ['warn', {
        varsIgnorePattern: '^_', // Ignorar variables que empiezan con _
        argsIgnorePattern: '^_'
      }],
      'jsx-a11y/anchor-is-valid': ['warn', {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['invalidHref', 'preferButton']
      }],
      'eqeqeq': ['warn', 'smart'], // Comparaciones más flexibles
      'react-hooks/exhaustive-deps': 'warn', // Advertencia en lugar de error
      
      // Ignorar módulos específicos o casos particulares
      'import/no-anonymous-default-export': 'warn'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  };