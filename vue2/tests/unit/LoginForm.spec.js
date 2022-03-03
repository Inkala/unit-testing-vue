import LoginForm from '@/components/LoginForm.vue';
import { mount } from '@vue/test-utils';

describe('LoginForm', () => {
  it('emits an event with a user data payload', () => {
    const wrapper = mount(LoginForm);
    const input = wrapper.find('[data-testid="name-input"]');
    input.setValue('Adam Jahr');
    wrapper.trigger('submit');

    const formSubmittedCalls = wrapper.emitted('formSubmitted');
    const expectedPayload = { name: 'Adam Jahr' };

    expect(formSubmittedCalls).toHaveLength(1);
    expect(formSubmittedCalls[0][0]).toMatchObject(expectedPayload);
  });
});
