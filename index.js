const express = require('express');
const connectDB = require('./db.js');
var cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require("./routers/authRoute.js"));
app.use('/api/user', require("./routers/userRoutes.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})