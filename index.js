const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace 'yourConnectionString' with your actual MongoDB connection string
mongoose.connect(
  'mongodb+srv://harshrwt027:4fJ227KSwEfdy2d9@cluster0.7ckouzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Add more fields as per your form
});

// Create a model based on the schema
const FormData = mongoose.model('FormData', formDataSchema);

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  // Extract data from request body based on custom attributes
  const { 'custom-name': name, 'custom-email': email } = req.body;

  // Create a new instance of FormData
  const formData = new FormData({ name, email });

  // Save the form data to MongoDB
  formData
    .save()
    .then(() => res.send('Form data saved successfully'))
    .catch((err) => res.status(400).send('Error saving form data'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
