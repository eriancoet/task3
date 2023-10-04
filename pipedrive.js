const axios = require('axios');

const PIPEDRIVE_API_URL = 'https://Rian-Sandbox.pipedrive.com/v1/persons?api_token=744cc977d27294cfd65794cffe6a7c7238163209';
const PIPEDRIVE_API_KEY = process.env.PIPEDRIVE_API_KEY;

async function updatePipedrivePersons(data) {
    try {
        console.log("[INFO] Updating persons in Pipedrive...");
        const response = await axios.post(PIPEDRIVE_API_URL, {
            data,
            api_token: PIPEDRIVE_API_KEY
        });
        console.log("[SUCCESS] Updated persons in Pipedrive.");
        return response.data;
    } catch (error) {
        console.error("[ERROR] Failed updating Pipedrive:", error.message);
        if (error.response) {
            console.error("[ERROR] Error Response from Pipedrive:", error.response.data);
        }
        throw error;
    }
}

module.exports = {
    updatePipedrivePersons
};
