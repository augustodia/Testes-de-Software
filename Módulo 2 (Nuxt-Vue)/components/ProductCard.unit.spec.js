import { mount } from '@vue/test-utils';
import ProductCard from './ProductCard';

import { makeServer } from '@/miragejs/server';
import { cartState } from '@/state';

let server;
const mountProductCard = () => {
  const product = server.create('product', {
    title: 'Relógio bonito',
    price: '$23.00',
    image:
      'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  });
  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
  };
};

describe('ProductCard - unit', () => {
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should add item to cartState on button click', async () => {
    const { wrapper } = mountProductCard();

    await wrapper.find('button').trigger('click');

    expect(cartState.items).toHaveLength(1);
  });

  it.todo('should ensure product is not added to the cart twice');
});
