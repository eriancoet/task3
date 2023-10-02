const express = require('express');
const router = express.Router();

// Import your HubSpot and Pipedrive handler modules
const { fetchHubSpotData, updateHubSpotData } = require('./hub');
const { fetchPipedriveData, updatePipedriveData } = require('./pipe');

// Route to sync data between HubSpot and Pipedrive


router.get('/sync', async (req, res) => {
  try {
    // Fetch data from HubSpot and Pipedrive
    const hubspotData = await fetchHubSpotData(); // Use the imported function
    const pipedriveData = await fetchPipedriveData(); // Use the imported function

    // Helper function to compare and synchronize data
    async function syncData(hubspotData, pipedriveData) {
      // ... (rest of your code)

      // Call the syncData function to perform synchronization
      const result = await syncData(hubspotData, pipedriveData);

      // Respond with a success message
      res.status(200).json(result);
    }

   // Inside your sync route handler
const result = await syncData(hubspotData, pipedriveData);

// Include the synchronized data in the response
res.status(200).json({ message: 'Data synchronized successfully', syncResult: result });

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Error occurred while syncing data' });
  }
});

// Route to update data in HubSpot
router.post('/update/hubspot', async (req, res) => {
  try {
    const { contactId, updatedData } = req.body;

    // Update data in HubSpot
    const updatedHubspotData = await updateHubSpotData(contactId, updatedData); // Use the imported function

// Include the updated data in the response
res.status(200).json({ message: 'Data updated in HubSpot', updatedData: updatedHubspotData });

// Inside your update/pipedrive route handler
const updatedPipedriveData = await updatePipedriveData(dealId, updatedData);

// Include the updated data in the response
res.status(200).json({ message: 'Data updated in Pipedrive', updatedData: updatedPipedriveData });

    // Respond with the updated data or a success message
    res.status(200).json(updatedHubspotData);
  } catch (error) {
    // Handle errors appropriately
    console.error('HubSpot update error:', error);
    res.status(500).json({ error: 'Error occurred while updating data in HubSpot' });
  }
});

// Route to update data in Pipedrive
router.post('/update/pipedrive', async (req, res) => {
  try {
    const { dealId, updatedData } = req.body;

    // Update data in Pipedrive
    const updatedPipedriveData = await updatePipedriveData(dealId, updatedData); // Use the imported function

    // Respond with the updated data or a success message
    res.status(200).json(updatedPipedriveData);
  } catch (error) {
    // Handle errors appropriately
    console.error('Pipedrive update error:', error);
    res.status(500).json({ error: 'Error occurred while updating data in Pipedrive' });
  }
});
console.log("Routes.js")
module.exports = router;
