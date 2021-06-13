const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

function hashPassword(user) {
  if (user.changed("password")) {
    return bcrypt.hash(user.password, SALT_ROUNDS).then((hashedPass) => {
      user.password = hashedPass;
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.associate = function (models) {
    User.hasMany(models.Comment, { as: "comments" });
    User.belongsToMany(models.Film, {
      through: "Comment",
      foreignKey: "UserId",
      as: "films",
    });
  };
  return User;
};
