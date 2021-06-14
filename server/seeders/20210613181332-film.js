const data = [
  {
    name: "Film Name",
    description: "Film description",
    releaseDate: "2020-12-11T00:00:00.000Z",
    rating: 3,
    ticketPrice: 1200,
    country: "Pakistan",
    genre: ["funny", "action"],
    photo: "film.png",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    name: "Film 2",
    description: "Film description",
    releaseDate: "2020-12-11T00:00:00.000Z",
    rating: 5,
    ticketPrice: 1250,
    country: "Pakistan",
    genre: ["Horror", "action"],
    photo: "film.png",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    name: "Film 3",
    description: "Film description",
    releaseDate: "2020-12-11T00:00:00.000Z",
    rating: 5,
    ticketPrice: 1300,
    country: "USA",
    genre: ["funny", "action"],
    photo: "film.png",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Films", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Films", null, {});
  },
};
