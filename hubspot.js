const axios = require('axios');

console.log("[DEBUG] HubSpot API Key:", process.env.HUBSPOT_API_KEY);

const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

async function fetchHubspotContacts() {
    try {
        console.log("[INFO] Fetching contacts from HubSpot...");
        
        const response = await axios.get(HUBSPOT_API_URL, {
            headers: {
                'Authorization': `Bearer ${HUBSPOT_API_KEY}`
            }
        });
        
        console.log("[DEBUG] Response from HubSpot:", response.data);
        
        if (!response.data || !Array.isArray(response.data.results)) {
            console.error("[ERROR] Invalid data structure from HubSpot");
            throw new Error('Invalid data received from HubSpot');
        }
        
        return response.data;

    } catch (error) {
        console.error("[ERROR] Failed fetching from HubSpot:", error.message);
        if (error.response) {
            console.error("[ERROR] Error Response from HubSpot:", error.response.data);
        }
        throw error;
    }
}

module.exports = {
    fetchHubspotContacts
};
