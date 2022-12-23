import { mount } from '@vue/test-utils';
import ProductCard from './ProductCard';
import { makeServer } from '@/miragejs/server';

describe('ProductCard - unit', () => {
  let server;
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });
  afterEach(() => {
    server.shutdown();
  });

  it('should match snapshot', () => {
    const wrapper = mount(ProductCard, {
      propsData: {
        product: server.create('product', {
          title: 'Relógio bonito',
          price: '$23.00',
          image:
            'https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        }),
      },
    });

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.element).toMatchSnapshot();
  });
});
