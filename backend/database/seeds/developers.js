const faker = require('faker');
const moment = require('moment');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('developers').del()
    .then(() => {
      // Inserts seed entries
      const developers = [];

      for (let i = 0; i < 200; i += 1) {
        const birthday = faker.date.past(23);
        const age = moment().diff(moment(birthday), 'years');
        developers.push({
          name: faker.name.findName(),
          birthday,
          age,
          hobby: faker.random.word(),
          sex: 'M',
        });
      }
      return knex('developers').insert(developers);
    });
};
