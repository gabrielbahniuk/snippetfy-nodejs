require('dotenv').config();
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: '0'
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: '0'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: '0'
  }
};
