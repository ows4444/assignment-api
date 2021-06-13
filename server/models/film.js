module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define("Film", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    ticketPrice: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: false },
  });

  Film.associate = function (models) {
    Film.hasMany(models.Comment, { as: "comments" });
  };
  return Film;
};
