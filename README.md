# Snippetfy with NodeJS / Express / Nunjucks / Sequelize

1 - Change the default database config file under `snippetfy/config/database.js`

```js
module.exports = {
  username: "DB_USERNAME",
  password: "DB_PASSWORD",
  database: "DB_NAME",
  host: "127.0.0.1",
  dialect: "DATABASE (e.g. mysql, postgres)"
};
```

2 - Run `npm install && npm start`.

3 - Use `localhost:3000/` in your browser.
