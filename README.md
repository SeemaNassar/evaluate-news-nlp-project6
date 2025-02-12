# Project Name: NLP Sentiment Analysis Web Application

## Overview

This project is a web application that performs sentiment analysis on text input using Natural Language Processing (NLP). The application integrates with an external API that analyzes text sentiment and returns results, which are then displayed dynamically on the page.

The project is structured to demonstrate the use of **Webpack**, **SASS**, **API Integration**, and **Service Workers**, with a focus on maintaining a clean and modular JavaScript structure.

### Key Features
- **Webpack Setup** for bundling JavaScript and managing dependencies.
- **SASS** for clean and maintainable styling.
- **API Integration** to send requests to the Aylien NLP API for text analysis.
- **Dynamic Content Rendering** using JavaScript.
- **Service Workers** to make the app available offline.

## Project Structure(client js side):

The JavaScript code is divided into three key files to handle different responsibilities:

1. **formHandler.js**: This file is responsible for managing the user's interaction with the application, including sending requests to the server and handling responses.
2. **urlValidator.js**: This file validates the user input to ensure that the URL or text entered by the user meets the required format.
3. **displayResults.js**: This file is responsible for dynamically displaying the results on the page, such as sentiment analysis scores and the sentiment itself.


## About the API that used in server side:
The API used for text analysis has been securely stored in the .env file and is accessed within the server to ensure confidentiality. So to run the project, make sure to create a `.env` file in the root directory and add your API key:
```
UDACITY_API_KEY=your_api_key_here
```

### Using the API

The `/url-to-api` POST route in server.js file has been configured to forward requests to this AWS endpoint. Here's an example of how the integration works:

1. The client sends a POST request to the `/url-to-api` endpoint of the local server.
2. The request contains the URL `https://www.linkedin.com/in/seema-nassar-43698224b/` in the body.
3. The server sends it to the  `urlValidator` to check whether it's valid or not.
4. If valid, it scraps the first 200 characters as text.
5. The server forwards the text to the AWS endpoint.
6. The AWS endpoint processes the text and returns the sentiment analysis results to the server.
8. The server responds to the client with the analysis results.
9. The client forwards the results to `displayResult`  to dynamically display them in the result div.

### Example Request

A sample POST request to the AWS endpoint could look like this:
```json
{
  "text": "Sign in to view Seema’s full profile"
}
```
### Example Response
```json
{
  "sentiment": "NEUTRAL",
  "sentiment_scores": {
    "Positive": 0.006687216926366091,
    "Negative": 0.00037863681791350245,
    "Neutral": 0.9929064512252808,
    "Mixed": 0.000027736476113204844
  },
  "text": "Sign in to view Seema’s full profile"
}
```

---

### Testing Steps:
#### Make sure to install the testing framework:
```
npm install --save-dev jest
```

1. Test the `formHandler.js` file:
    - Ensure all functions dealing with form submission and data formatting are working as expected.
    - Use `jest` to test the functions responsible for sending data and receiving a response.
    - Make sure the data processing function handles errors properly.
    - Simulate the API response and verify that the data is displayed correctly on the user interface.

2. Test the `urlValidator.js` file:
    - Test the functions that check the validity of the URL input.
    - Write tests to ensure that the URL sent to the server is a valid URL.
    - Check that invalid URLs are rejected with appropriate error messages.
    - Ensure that different formats (like http or https) are handled correctly.

3. Test the `displayResults.js` file:
    - Test the functions responsible for displaying the results of the API.
    - Verify that the results are displayed correctly on the page based on the server's response.
    - Ensure that errors or missing data are handled properly.
    - Confirm that the interface displays the information in a consistent and readable way (e.g., percentages, scores).


Thank you,
Seema Nassar.