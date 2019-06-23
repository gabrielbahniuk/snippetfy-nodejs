module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  });
  User.associate = models => User.hasMany(models.Category);
  User.associate = models =>
    User.hasOne(models.VerificationToken, {
      as: 'verificationtoken',
      foreignKey: 'UserId',
      foreignKeyConstraint: true
    });
  return User;
};
