// import necessary functions
import { isValidURL } from './urlValidator';
import { displayResults } from './displayResults';

const serverURL = 'http://localhost:8000/url-to-api';

// init form event listener
export function initForm() {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

// handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    const inputElement = document.getElementById('name');
    if (!inputElement) {
        console.error("Error: Input field with ID 'name' not found.");
        return;
    }

    const formURL = inputElement.value.trim();

    if (!isValidURL(formURL)) {
        alert('Please enter a valid URL.');
        return;
    }

    try {
        // send valid URL to the server
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entered_url: formURL }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        // get and display the response
        const result = await response.json();
        displayResults(result);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Something went wrong. Please try again.');
    }
}

export { handleSubmit };
