const express = require('express');
const router = express.Router();
const userSchema = require('../validators/userSchema'); // Adjust the path based on your folder structure

// Import your HubSpot and Pipedrive handler modules
const { fetchHubSpotData, updateHubSpotData } = require('../hub');
const { fetchPipedriveData, updatePipedriveData } = require('../pipe');


router.post('/register', (req, res) => {
  const userData = req.body;

  // Validate user data against the schema
  const { error, value } = userSchema.validate(userData);

  if (error) {
    return res.status(400).json({ error: 'Invalid user data', details: error.details });
  }

  else 
  {
    console.log("validated")
    return res.send('Validated');
  }
  
});

// Route to sync data between HubSpot and Pipedrive

router.get('/hub/sync', async (req, res) => {
  try {
    // Fetch data from HubSpot and Pipedrive
    const hubspotData = await fetchHubSpotData();
    const pipedriveData = await fetchPipedriveData();

    // Helper function to compare and synchronize data
    async function syncData(hubspotData, pipedriveData) {
      // ... (rest of your code)

      // Call the syncData function to perform synchronization
      const result = await syncData(hubspotData, pipedriveData);

      // Include the synchronized data in the response
      console.log("/hub/sync");
      res.status(200).json({ message: 'Data synchronized successfully', syncResult: result });

      console.log("sync");
    }

    // Inside your sync route handler
    const result = await syncData(hubspotData, pipedriveData);

    // Do not include the response here

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Error occurred while syncing data' });
  }
});


console.log("Hello!")
// Route to update data in HubSpot
router.post('/update/hubspot', async (req, res) => {
  try {
    const { contactId, updatedData } = req.body;

    // Update data in HubSpot
    const updatedHubspotData = await updateHubSpotData(contactId, updatedData); // Use the imported function

// Include the updated data in the response
res.status(200).json({ message: 'Data updated in HubSpot', updatedData: updatedHubspotData });

// Inside your update/pipedrive route handler
const updatedPipedriveData = await updatePipedriveData(personId, updatedData);

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
    const { personId, updatedData } = req.body;

    // Update data in Pipedrive
    const updatedPipedriveData = await updatePipedriveData(personId, updatedData); // Use the imported function

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
