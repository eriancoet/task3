require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const PIPEDRIVE_API_KEY = process.env.PIPEDRIVE_API_KEY; // Move this line up
const PIPEDRIVE_API_URL = `https://api.pipedrive.com/v1/persons?api_token=${PIPEDRIVE_API_KEY}`;

app.get('/sync', async (req, res) => {
    console.log("[INFO] Sync endpoint hit. Starting sync process...");

    try {

        const hubspotData = await fetchFromHubspot();
        console.log('First few HubSpot entries:', hubspotData.slice(0, 5));
        const processedData = processHubspotData(hubspotData);
        console.log('First few processed entries:', processedData.slice(0, 5));
        
       
        const pipedriveResults = await pushToPipedrive(processedData);

        const results = {
            hubspotFetched: hubspotData.length,
            pipedriveUpdated: pipedriveResults.updatedCount,
            errors: pipedriveResults.errors
        };

        res.status(200).json(results);

    } catch (error) {
        console.error('Error pushing data to Pipedrive:', error.response ? error.response.data : error.message);
        console.error("[ERROR] Sync process failed.");
        console.error("[ERROR DETAILS] Message:", error.message);
        console.error("[ERROR DETAILS] Stack Trace:", error.stack);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`[INFO] Server is running on port ${PORT}`);
});

async function fetchFromHubspot(after = null) {
    const headers = {
        Authorization: `Bearer ${HUBSPOT_API_KEY}`
    };

    const params = {
        limit: 100, 
        properties: ['email', 'firstname', 'lastname']
    };

    if (after) {
        params.after = after;
    }

    try {
        const response = await axios.get(HUBSPOT_API_URL, { headers, params });
        return response.data.results; // Assuming the data is in the 'results' property
    } catch (error) {
        console.error('Error fetching data from HubSpot:', error.message);
        throw error;
    }
}
function processHubspotData(data) {
    return data.map(contact => {
        const firstname = contact.properties.firstname || "No First Name";
        const lastname = contact.properties.lastname || "No Last Name";
        const email = contact.properties.email || "No Email";
        return {
            name: `${firstname} ${lastname}`,
            email: email
        };
    });
}



    async function pushToPipedrive(data) {
        const headers = {
            Authorization: `Bearer ${PIPEDRIVE_API_KEY}`
        };
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const retryMax = 5;
        let retryCount = 0;
    
        const responses = [];
        for (const contact of data) {
            try {
                const response = await axios.post(PIPEDRIVE_API_URL, contact, { headers });
                responses.push(response);
                await delay(500); // delay for 500ms between requests
            } catch (error) {
                if (error.response && error.response.status === 429 && retryCount < retryMax) {
                    console.warn('Rate limited by Pipedrive. Retrying in 2 seconds...');
                    await delay(2000); // wait for 2 seconds before retrying
                    retryCount++;
                } else {
                    console.error('Error pushing data to Pipedrive:', error.message);
                    throw error;
                }
            }
        }
    
        return {
            updatedCount: responses.length,
            errors: [] // Add error processing logic if necessary
        };
    }
    