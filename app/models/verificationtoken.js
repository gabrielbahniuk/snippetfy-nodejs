module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    UserId: DataTypes.INTEGER,
    token: DataTypes.STRING
  });

  VerificationToken.associate = models => {
    VerificationToken.belongsTo(models.User);
  };
  return VerificationToken;
};
