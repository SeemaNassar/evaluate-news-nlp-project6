export function isValidURL(url) {
    // regex to match http and https
    const regex = /^(https?):\/\/[^\s$.?#].[^\s]*$/gm;
    
    const invalidCharacters = /[@]/;

    if (invalidCharacters.test(url)) {
        return false;
    }
    
    return regex.test(url);
}
