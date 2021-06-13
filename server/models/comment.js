const User = require("./user");
const Film = require("./film");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    FilmId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "UserId" });
    Comment.belongsTo(models.Film, { foreignKey: "FilmId" });
  };
  return Comment;

  //Film.hasMany
};
