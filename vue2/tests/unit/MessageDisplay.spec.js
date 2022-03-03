import MessageDisplay from '@/components/MessageDisplay.vue';
import { mount } from '@vue/test-utils';
import { getMessage } from '@/services/axios';
import flushPromises from 'flush-promises';

jest.mock('@/services/axios');
beforeEach(() => {
  jest.clearAllMocks();
});

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
    const mockMessage = 'Hello fro the db';
    getMessage.mockResolvedValueOnce({ text: mockMessage });
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    const message = wrapper.find('[data-testid="message"]').element.textContent;

    expect(getMessage).toHaveBeenCalledTimes(1);
    expect(message).toEqual(mockMessage);
  });

  it('Displays an error qhen getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong';
    getMessage.mockRejectedValueOnce(mockError);
    const wrapper = mount(MessageDisplay);

    await flushPromises();
    const errorMessage = wrapper.find('[data-testid="message-error"]').element
      .textContent;

    expect(getMessage).toHaveBeenCalledTimes(1);
    expect(errorMessage).toEqual(mockError);
  });
});
