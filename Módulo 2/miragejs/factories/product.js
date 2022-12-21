/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */

/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import { Factory } from 'miragejs';
import { faker } from '@faker-js/faker';

export default {
  product: Factory.extend({
    title() {
      return faker.lorem.words();
    },
    price() {
      return faker.commerce.price();
    },
  }),
};
