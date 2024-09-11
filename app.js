const registerController = require('./controller/registerController');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register', registerController.Register);




app.listen(port, ()=> {
    console.log(`Node_Server API listening on Port : ${port}`);
});
