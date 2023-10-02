// Create middleware functions that wrap the exported functions
function fetchHubSpotDataMiddleware(req, res, next) {
  fetchHubSpotData() // Use the function directly here
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

  updateHubSpotData(contactId, updatedData) // Use the function directly here
    .then((updatedData) => {
      req.updatedHubspotData = updatedData;
      next();
    })
    .catch((error) => {
      console.error('HubSpot update error:', error);
      res.status(500).json({ error: 'Error occurred while updating data in HubSpot' });
    });
}

// Export the middleware functions directly
module.exports = {
  fetchHubSpotDataMiddleware,
  updateHubSpotDataMiddleware,
};
