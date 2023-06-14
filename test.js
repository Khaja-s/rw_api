const axios = require('axios');

// Base URL for the API
const baseURL = 'http://localhost:3000';

// Function to handle errors
function handleError(error) {
  console.error('Request failed:', error.message);
}

// Get all entries
axios
  .get(`${baseURL}/entries`)
  .then((response) => {
    console.log('All Entries:', response.data);
  })
  .catch(handleError);

// Get entry based on serial
const serialNumber = '12345'; // Replace with an existing serial number
axios
  .get(`${baseURL}/entries/${serialNumber}`)
  .then((response) => {
    console.log(`Entry with Serial Number ${serialNumber}:`, 
response.data);
  })
  .catch(handleError);

// Write data
const newEntry = { name: 'John Doe', serial: '67890' };
axios
  .post(`${baseURL}/entries`, newEntry)
  .then((response) => {
    console.log('New Entry:', response.data);
  })
  .catch(handleError);

// Delete an entry based on serial
const entryToDelete = '12345'; // Replace with an existing serial number
axios
  .delete(`${baseURL}/entries/${entryToDelete}`)
  .then(() => {
    console.log(`Entry with Serial Number ${entryToDelete} deleted 
successfully`);
  })
  .catch(handleError);

