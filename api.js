const express = require('express');
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');
const cors = require('cors'); // Add this line

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



//const dataFilePath = 'data.json';

// Helper function to read data from the JSON file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return [];
  }
}

// Helper function to write data to the JSON file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}

// Get all entries
app.get('/entries', (req, res) => {
  const data = readDataFromFile();
  res.json(data);
});

// Get entry based on serial
app.get('/entries/:serial', (req, res) => {
  const serial = req.params.serial;
  const data = readDataFromFile();
  const entry = data.find((item) => item.serial === serial);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ error: 'Entry not found' });
  }
});

// Write data
app.post('/entries', (req, res) => {
  const { name, serial } = req.body;

  if (!name || !serial) {
    res.status(400).json({ error: 'Name and serial are required' });
    return;
  }

  const data = readDataFromFile();
  const entry = { name, serial };
  data.push(entry);
  writeDataToFile(data);

  res.status(201).json(entry);
});

// Delete an entry based on serial
app.delete('/entries/:serial', (req, res) => {
  const serial = req.params.serial;
  const data = readDataFromFile();
  const index = data.findIndex((item) => item.serial === serial);

  if (index !== -1) {
    data.splice(index, 1);
    writeDataToFile(data);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Entry not found' });
  }
});

// Start the server
app.listen(3000, () => {
console.log('Current working directory:', process.cwd());
  console.log('API server listening on port 3000');

});
