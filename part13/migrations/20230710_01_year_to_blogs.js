const { DataTypes, QueryInterface } = require("sequelize");

module.exports = {
  up: async ({ context: QueryInterface }) => {
    await QueryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 2023,
        min: 1991,
      },
    });
  },
  down: async ({ context: QueryInterface }) => {
    await QueryInterface.removeColumn("blogs", "year");
  },
};
