const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect('mongodb+srv://vijenderchimma424:Vijju%40213@vijjucluster.npg02lu.mongodb.net/tridizi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const employeeSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  experience: Number,
  skills: String,
  dateOfJoining: Date,
  salary: Number,
  photo: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(express.json());
app.use(cors());

// POST API endpoint for adding a new employee
app.post('/employeedetails', async (req, res) => {
  try {
    const {
      fullName,
      age,
      experience,
      skills,
      dateOfJoining,
      salary,
      photo,
    } = req.body;

    // Validate the request data (add more validation as needed)
    if (!fullName || !age || !experience || !skills || !dateOfJoining || !salary || !photo) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new employee document
    const newEmployee = new Employee({
      fullName,
      age,
      experience,
      skills,
      dateOfJoining,
      salary,
      photo,
    });
    console.log('About to save data to the database');
    // Save the new employee to the database
    await newEmployee.save();
    console.log('Data successfully saved to the database');

    // Respond with the newly created employee
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Add this endpoint to retrieve all employee data
app.get('/employeedetails', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.delete('/employeedetails/:id', async (req, res) => {
    try {
      // Your existing delete logic here
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      res.json(deletedEmployee);
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

