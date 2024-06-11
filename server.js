const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dynamicFormDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const formSchema = new mongoose.Schema({
    formData: mongoose.Schema.Types.Mixed
});

const Form = mongoose.model('Form', formSchema);

// Routes
app.post('/save-form', async (req, res) => {
    try {
        const formData = req.body;
        const newForm = new Form({ formData });
        await newForm.save();
        res.status(200).json({ message: 'Form data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
