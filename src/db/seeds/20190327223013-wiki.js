
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wikis', [{
      title: 'Marswiki',
      body: 'A wiki about Mars.',
      private: false,
      createdAt: '2019-03-27 07:01:00',
      updatedAt: '2019-03-27 07:02:00',
      userId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wikis', null, {});
  }
};
