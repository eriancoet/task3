const axios = require('axios');

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

async function fetchFromHubspot(after = null) {
    // Specify your query parameters
    const params = {
        limit: 100, // Adjust as per your needs
        properties: ['email', 'firstname', 'lastname'] // Specify other properties if needed
    };

    if (after) {
        params.after = after;
    }

    // Add the Authorization header
    const headers = {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`
    };

    try {
        const response = await axios.get(HUBSPOT_API_URL, { params, headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from HubSpot:', error.message);
        throw error;
    }
}

module.exports = {
    fetchFromHubspot
};
