const mongoose = require('mongoose'); // { useNewUrlParser: true }
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=> console.log('Connected to MongoDB...'))
.catch((err) => console.log('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customer', customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));