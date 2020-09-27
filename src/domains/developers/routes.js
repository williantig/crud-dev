const express = require('express');
const developersController = require('./controller');
const developersValidators = require('./validation');

const route = express.Router();

route
  .get('/developers', developersController.list)
  .post('/developers', [developersValidators.create, developersController.create])
  .put('/developers/:id', developersController.update)
  .delete('/developers/:id', developersController.deleteDeveloper);

module.exports = route;
