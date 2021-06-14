const data = [
  {
    UserId: 1,
    FilmId: 1,
    content: "Good Movie",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    UserId: 1,
    FilmId: 2,
    content: "Amazing Movie",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    UserId: 1,
    FilmId: 3,
    content: "Favorite Movie",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
