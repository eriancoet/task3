const express = require('express');
const axios = require('axios'); // You may need to install the axios package
const router = express.Router();

const pipedriveApiKey = process.env.PIPEDRIVE_API_TOKEN; // Access your Pipedrive API key from environment variables

// Function to fetch data from Pipedrive (e.g., deals)
async function fetchPipedriveData() {
  try {
    const response = await axios.get('https://Rian-Sandbox.pipedrive.com/v1/persons', {
      params: {
        api_token: pipedriveApiKey,
      },
    });

    return response.data; // Return fetched data
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

// Function to update data in Pipedrive (e.g., update a deal)
async function updatePipedriveData(person, updatedData) {
  try {
    const response = await axios.put(`https://Rian-Sandbox.pipedrive.com/v1/persons${person}`, updatedData, {
      params: {
        api_token: pipedriveApiKey,
      },
    });

    return response.data; // Return updated data
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

// Create middleware functions that wrap the exported functions
function fetchPipedriveDataMiddleware(req, res, next) {
  fetchPipedriveData() // Use the function directly here
    .then((data) => {
      req.pipedriveData = data;
      next();
    })
    .catch((error) => {
      console.error('Pipedrive fetch error:', error);
      res.status(500).json({ error: 'Error occurred while fetching data from Pipedrive' });
    });
}

function updatePipedriveDataMiddleware(req, res, next) {
  const { dealId, updatedData } = req.body;

  updatePipedriveData(dealId, updatedData) // Use the function directly here
    .then((updatedData) => {
      req.updatedPipedriveData = updatedData;
      next();
    })
    .catch((error) => {
      console.error('Pipedrive update error:', error);
      res.status(500).json({ error: 'Error occurred while updating data in Pipedrive' });
    });
}

// Export the middleware functions directly
module.exports = {
  fetchPipedriveDataMiddleware,
  updatePipedriveDataMiddleware,
};
