module.exports = {
  up: (queryInterface, DataTypes) => Promise.all([
    queryInterface.createTable('Sessions', {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    }),
  ]),

  down: queryInterface => Promise.all([queryInterface.dropTable('Sessions')]),
};
