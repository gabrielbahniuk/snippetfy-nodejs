require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = {};
const opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
};
const sequelize = new Sequelize(process.env.DATABASE_URL, opts);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
