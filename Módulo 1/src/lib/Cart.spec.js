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
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total ammount', () => {
      const item = {
        product,
        quantity: 2, //70776
      };
      cart.add(item);
      expect(cart.getTotal().getAmount()).toEqual(70776);
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
      expect(cart.getTotal().getAmount()).toEqual(35388);
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
      expect(cart.getTotal().getAmount()).toEqual(41872);
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

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 4,
      });
      cart.add({
        product: product2,
        quantity: 2,
      });

      expect(cart.summary()).toMatchSnapshot(); // Pega o valor do retorno e grava na pasta _snapshots. Ao mudar quebra o teste.
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0); // Certifique-se que existe pelo menos 1 produto com price > 0
    });

    it('should include formatted amount inthe summary', () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary().formatted).toEqual('R$3,025.56');
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 2,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('especial conditions', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('should not apply percentage discount quantity is below or equals minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should not apply quantity discount for odd quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should receive two or more conditions and determine/apply the best discount. First case.', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should receive two or more conditions and determine/apply the best discount. Scond case.', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
