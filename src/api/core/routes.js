const uploadRouter = require('../routes/uploadFile/Routes')

function routes(app) {
  app.use('/', uploadRouter);

  
}

module.exports = routes;
