import Cart from './Cart';

describe('Cart', () => {
  let cart;
  const product = {
    title: 'Adidas running shoes - men',
    price: 35388, //353.88 | R$ 383,88
  };
  const product2 = {
    title: 'Adidas running shoes - women',
    price: 41872, //353.88 | R$ 383,88
  };
  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal', () => {
    it('should return 0 when getTotal() is executed in a newly created instance ', () => {
      expect(cart.getTotal()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total ammount', () => {
      const item = {
        product,
        quantity: 2, //70776
      };
      cart.add(item);
      expect(cart.getTotal()).toEqual(70776);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product,
        quantity: 1,
      });
      expect(cart.getTotal()).toEqual(35388);
    });

    it('should update total when a product gets included an then removed', () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });
      cart.remove(product);
      expect(cart.getTotal()).toEqual(41872);
    });
  });

  describe('checkout', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 4,
      });
      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.checkout()).toMatchSnapshot(); // Pega o valor do retorno e grava na pasta _snapshots. Ao mudar quebra o teste.
    });

    it('should return an object with the total and the list of items when sumary() is called', () => {
      cart.add({
        product,
        quantity: 4,
      });
      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.sumary()).toMatchSnapshot(); // Pega o valor do retorno e grava na pasta _snapshots. Ao mudar quebra o teste.
      expect(cart.getTotal()).toBeGreaterThan(0); // Certifique-se que existe pelo menos 1 produto com price > 0
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 2,
      });

      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });
  });
});
