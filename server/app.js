const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colombiaRoutes = require('./routes/colombia');
const usersRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/colombia', colombiaRoutes);
app.use('/colombia', usersRoutes);


app.listen('4000', () => {
    console.log('Server started!');
})
