module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true, primaryKey: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    FilmId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "UserId", as: "user" });
    Comment.belongsTo(models.Film, { foreignKey: "FilmId", as: "film" });
  };
  return Comment;
};
