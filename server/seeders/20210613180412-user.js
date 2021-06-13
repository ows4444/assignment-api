const users = [
  {
    name: "user",
    email: "demo@mail.com",
    password: "$2b$10$GZZSCG0m/cC7hit0j3sRy.KiFcnO1oSKE2gzLZH6Xis.vVGZFYYVi", //password
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
