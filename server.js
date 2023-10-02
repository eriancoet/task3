const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import middleware
const cors = require('cors');

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import your route handlers and middleware
const routes = require('./routes');
const hubMiddleware = require('./hub');
const pipeMiddleware = require('./pipe');

// Define your routes with the middleware
app.get('/hub/fetch', hubMiddleware.fetchHubSpotDataMiddleware, (req, res) => {
  const hubspotData = req.hubspotData;
  res.status(200).json(hubspotData);
});

app.post('/hub/update', hubMiddleware.updateHubSpotDataMiddleware, (req, res) => {
  const updatedData = req.updatedHubspotData;
  res.status(200).json(updatedData);
});

app.get('/pipe/fetch', pipeMiddleware.fetchPipedriveDataMiddleware, (req, res) => {
  const pipedriveData = req.pipedriveData;
  res.status(200).json(pipedriveData);
});

app.post('/pipe/update', pipeMiddleware.updatePipedriveDataMiddleware, (req, res) => {
  const updatedData = req.updatedPipedriveData;
  res.status(200).json(updatedData);
});

// Define other routes if needed
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
