/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';
import { randomNumber } from './utils';

export default {
  user: Factory.extend({
    name() {
      return faker.name.fullName();
    },
    mobile() {
      return faker.phone.number();
    },
    afterCreate(user, server) {
      const messages = server.createList('message', randomNumber(10), { user });

      user.update({ messages });
    },
  }),
};
