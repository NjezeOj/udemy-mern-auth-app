const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose'); //should be added after the cors

const app = express();


require('dotenv').config();

const port = process.env.PORT || 5000;


app.use(cors());
const uri = process.env.ATLAS_URI;


app.use(express.json());

app.use('/auth', require('./routes/user'));
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection established succesfully"); });

app.use(express.json());

app.listen(port, () => {
    console.log('server is running on port:' + port);
});





