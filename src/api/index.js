// import express from 'express';
const express = require('express');

// import getHome from './modules/home/home';
// import postInfo from './modules/info/info';
const errorHandler = require('./core/errorHandler');
const logger = require('./core/logger');

const parseResponse = require('./core/parseResponse');
const cors = require('./core/cors');
const routes = require('./core/routes');
// const dbConnect = require('./core/db');


const app = express();
const PORT = process.env.PORT || 3001;

// dbConnect();
logger(app);
parseResponse(app);
cors(app);
routes(app);
errorHandler(app);


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
