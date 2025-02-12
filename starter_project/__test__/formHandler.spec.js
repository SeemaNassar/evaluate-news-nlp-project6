import { handleSubmit } from '../src/client/js/formHandler'; 
import { isValidURL } from '../src/client/js/urlValidator';
import { displayResults } from '../src/client/js/displayResults';

jest.mock('../src/client/js/urlValidator', () => ({
  isValidURL: jest.fn(),
}));

jest.mock('../src/client/js/displayResults', () => ({
  displayResults: jest.fn(),
}));

describe('handleSubmit', () => {
  let formElement;
  let inputElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" type="text" value="http://example.com">
      </form>
      <div id="results"></div>
    `;

    formElement = document.getElementById('urlForm');
    inputElement = document.getElementById('name');

    isValidURL.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should alert the user if the URL is invalid', async () => {
    isValidURL.mockReturnValue(false);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await handleSubmit({ preventDefault: jest.fn() });

    expect(alertSpy).toHaveBeenCalledWith('Please enter a valid URL.');
    alertSpy.mockRestore();
  });

  it('should call displayResults if the fetch request is successful', async () => {
    const mockData = {
      sentiment: 'POSITIVE',
      sentiment_scores: { Positive: 0.9, Negative: 0.1, Neutral: 0.0, Mixed: 0.0 },
      text: 'This is great!',
    };

    // mocking the fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await handleSubmit({ preventDefault: jest.fn() });

    expect(displayResults).toHaveBeenCalledWith(mockData);
  });

  it('should handle fetch errors and alert the user', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Server error'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await handleSubmit({ preventDefault: jest.fn() });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Fetch error:', new Error('Server error'));
    expect(alertSpy).toHaveBeenCalledWith('Something went wrong. Please try again.');

    consoleErrorSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
