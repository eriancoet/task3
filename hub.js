const express = require('express');
const axios = require('axios'); // You may need to install the axios package
const router = express.Router();

const hubspotApiKey = process.env.HUBSPOT_API_KEY; // Access your HubSpot API key from environment variables

// Function to fetch data from HubSpot (e.g., contacts)
async function fetchHubSpotData() {
  try {
    const response = await axios.get('https://api.hubapi.com/crm/v3/objects/contacts', {
      params: {
        hapikey: hubspotApiKey,
      },
    });

    return response.data; // Return fetched data
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

// Function to update data in HubSpot (e.g., update a contact)
async function updateHubSpotData(contactId, updatedData) {
  try {
    const response = await axios.put(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/profile`, updatedData, {
      params: {
        hapikey: hubspotApiKey,
      },
    });

    return response.data; // Return updated data
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

// Create middleware functions that wrap the exported functions
function fetchHubSpotDataMiddleware(req, res, next) {
  fetchHubSpotData()
    .then((data) => {
      req.hubspotData = data;
      next();
    })
    .catch((error) => {
      console.error('HubSpot fetch error:', error);
      res.status(500).json({ error: 'Error occurred while fetching data from HubSpot' });
    });
}

function updateHubSpotDataMiddleware(req, res, next) {
  const { contactId, updatedData } = req.body;

  updateHubSpotData(contactId, updatedData)
    .then((updatedData) => {
      req.updatedHubspotData = updatedData;
      next();
    })
    .catch((error) => {
      console.error('HubSpot update error:', error);
      res.status(500).json({ error: 'Error occurred while updating data in HubSpot' });
    });
}

console.log("hub");
module.exports = {
  fetchHubSpotDataMiddleware,
  updateHubSpotDataMiddleware,
};
