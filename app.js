const pool = require('./db/pool');
const sql = require('./sql/query');
const express = require('express');

const app = express();
const port = 8080;

app.listen(port, ()=> {
    console.log(`Node_Server API listening on Port : ${port}`);
});
