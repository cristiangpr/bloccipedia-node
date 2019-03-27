'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    username: {
     type: Sequelize.STRING,
     allowNull: false
  },
      email: {
       allowNull: false,
       unique: true,

    // #1
       validate: {
         isEmail: { msg: "must be a valid email" }
       },
       type: Sequelize.STRING
     },
     password: {
       allowNull: false,
       type: Sequelize.STRING
     },
     role: {
      type:  Sequelize.STRING,
         allowNull: false,
      defaultValue:"standard"
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
