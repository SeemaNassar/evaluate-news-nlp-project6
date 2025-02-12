import { isValidURL } from "../src/client/js/urlValidator";

describe('isValidURL', () => {

    test('should return true for a valid LinkedIn URL', () => {
        const result = isValidURL('https://www.linkedin.com/in/seema-nassar-43698224b/');
        expect(result).toBe(true);
    });

    test('should return false for an invalid LinkedIn URL without protocol', () => {
        const result = isValidURL('www.linkedin.com/in/seema-nassar-43698224b/');
        expect(result).toBe(false);
    });

    test('should return false for an invalid LinkedIn URL with spaces', () => {
        const result = isValidURL('https://www.linkedin.com/in/seema nassar-43698224b/');
        expect(result).toBe(false);
    });

    test('should return false for a LinkedIn URL with invalid characters', () => {
        const result = isValidURL('https://www.linkedin.com/in/seema-nassar-43698224b/@');
        expect(result).toBe(false);
    });

});
