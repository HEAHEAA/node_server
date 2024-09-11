const userController = require('./controller/userController');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register', userController.Register);
app.post('/login', userController.Login);
app.post('/refresh_token', userController.refreshJWT);




app.listen(port, ()=> {
    console.log(`Node_Server API listening on Port : ${port}`);
});
