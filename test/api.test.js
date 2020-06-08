import getMovieRate from '../src/app/js/api/get-rate.js';
import getEngTranslate from '../src/app/js/api/get-translate.js';

beforeEach(() => {
  fetch.resetMocks();
});


test('returns result if non-empty object in getMovieRate', () => {
  fetch.mockResponseOnce(JSON.stringify({ Runtime: '96 min' }));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return getMovieRate('tt0093629')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({ Runtime: '96 min' });
    });
});

test('returns result if non-empty object in getMovieTranslate', () => {
  fetch.mockResponseOnce(JSON.stringify({}));
  const onResponse = jest.fn();
  const onError = jest.fn();

  return getEngTranslate('футбол')
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({});
    });
});
