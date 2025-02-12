// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

// scrape text from a URL
async function scrapeTextFromURL(url) {
    try {
        console.log(`Fetching and scraping text from URL: ${url}`);

        // Fetch the webpage data with a custom User-Agent to mimic a regular browser request
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Use Cheerio to load the HTML and extract the text
        const $ = cheerio.load(data);

        // Target specific content-rich elements (main, article, section, header, or body)
        let text = $('main').text().trim() || 
        $('article').text().trim() || 
        $('section').text().trim() || 
        $('header').text().trim() || 
        $('body').text().trim();

        // Check if text exist
        if (!text) {
            console.error('The text content did not found at the provided URL');
            return null;
        }

        // Extract and return the first 200 characters of the text
        const trimmedText = text.slice(0, 200);
        console.log(`Extracted Text (200 characters):\n${trimmedText}\n--- End of Text Preview ---`);
        return trimmedText;
    } catch (error) {
        console.error('Error while scraping text from the URL:', error.message);
        if (error.response && error.response.status === 403) {
            throw new Error('Access to the URL is forbidden. Please check if scraping is allowed.');
        }
        throw new Error('Failed to scrape text from the URL');
    }
}

// url-to-api route
app.post('/url-to-api', async (req, res) => {
    const { entered_url } = req.body;

    // Validate the input URL
    if (!entered_url) {
        console.error('No URL provided in the request body');
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // scrape text from the URL
        const text = await scrapeTextFromURL(entered_url);

        if (!text) {
            return res.status(400).json({ error: 'No text content found at the provided URL' });
        }

        // connect to the AWS NLP API(UDACITY_API)
        try {
            console.log('Text being sent to NLP API:', text);
            const response = await axios.post(process.env.UDACITY_API, { text });
            //print then return the NLP results to the client
            console.log('NLP API Response:', response.data);
            return res.json(response.data);
        } catch (error) {
            console.error('Error from NLP API:', error.response?.data || error.message);
            return res.status(500).json({ error: 'Failed to analyze the text with NLP API' });
        }
    } catch (error) {
        console.error('Error during URL processing or API request:', error.message);
        return res.status(500).json({ error: 'Failed to analyze the URL' });
    }
});

// default route
app.get('/', (req, res) => {
    res.send("This is the server API page. You may access its services via the client app.");
});

// start the server on port 8000
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
