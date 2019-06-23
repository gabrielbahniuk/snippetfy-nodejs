require('dotenv').config();
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: false
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    operatorsAliases: false
  },
  production: {
    operatorsAliases: false,
    use_env_variable: 'DATABASE_URL'
  }
};