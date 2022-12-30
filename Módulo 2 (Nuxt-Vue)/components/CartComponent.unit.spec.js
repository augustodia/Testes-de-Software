import { mount } from '@vue/test-utils';
import CartComponent from '@/components/CartComponent';

describe('Cart', () => {
  it('should mount the component', () => {
    const wrapper = mount(CartComponent);

    expect(wrapper.vm).toBeDefined();
  });

  it('should emit close event when button gets clicked', async () => {
    const wrapper = mount(CartComponent);
    const button = wrapper.find('[data-testid="close-button"]');

    await button.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close).toHaveLength(1);
  });

  it('should hide the cart when no prop isOpen is passed', () => {
    const wrapper = mount(CartComponent);

    expect(wrapper.classes()).toContain('hidden');
  });

  it('should hide the cart when prop isOpen is passed', () => {
    const wrapper = mount(CartComponent, {
      propsData: {
        isOpen: true,
      },
    });

    expect(wrapper.classes()).not.toContain('hidden');
  });
});
