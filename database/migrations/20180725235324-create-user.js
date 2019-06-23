module.exports = {
  up: (queryInterface, DataTypes) => {
    return Promise.all([
      queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING
        },
        isVerified: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      })
    ]);
  },
  down: queryInterface => Promise.all([queryInterface.dropTable('Users')])
};
