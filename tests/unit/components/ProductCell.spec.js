import ProductCell from "@/components/ProductCell.vue";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from 'pinia'

describe('ProductCell', () => {
    let wrapper;

    beforeAll(() => {
        setActivePinia(createPinia());
        window.f = jest.fn(val => val);
        wrapper = shallowMount(ProductCell, {
            propsData: {
                product: {
                    id: '1',
                    image: '/path/to/image',
                    name: 'Назва товару',
                    price: 2.25,
                },
            },
        });
    })

    test('Test component price rendering', () => {
        const priceElement = wrapper.find('span.price');
        expect(priceElement.text()).toBe('2.25');
    });
    test('Test component title rendering', () => {
        const titleElement = wrapper.find('.info-section > h4');
        expect(titleElement.text()).toBe('Назва товару');
    });
    test('Test price computing depends on count input', async () => {
        const countInput = wrapper.findComponent({ name: 'PriceSelector' });
        countInput.vm.$emit('update:modelValue', 2);
        await wrapper.vm.$nextTick();

        const priceElement = wrapper.find('span.price');
        expect(priceElement.text()).toBe('4.5');
    });
    test('Test image click', async () => {
        const imageElement = wrapper.find('.image-section');
        imageElement.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('view-product')).toEqual([['1']]);
    });
    test('Test add product in cart', async () => {
        const buttonElement = wrapper.findComponent({ name: 'Button' });
        buttonElement.vm.$emit('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('add-to-cart')).toEqual([[
            {
                id: '1',
                image: '/path/to/image',
                name: 'Назва товару',
                price: 2.25,
                quantity: 2,
            }
        ]]);
    });
    test('Test remove product from cart', async () => {
        console.log(wrapper.vm.cartStore.getters);
        // wrapper.vm.$state.items = [
        //     {
        //         id: '1',
        //         image: '/path/to/image',
        //         name: 'Назва товару',
        //         price: 2.25,
        //         quantity: 2,
        //     }
        // ];
        const buttonElement = wrapper.findComponent({ name: 'Button' });
        // buttonElement.vm.$emit('click');
        // await wrapper.vm.$nextTick();

        // expect(wrapper.emitted('remove-to-cart')).toEqual([['1']]);
    });
});
