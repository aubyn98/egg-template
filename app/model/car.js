
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/car'));
module.exports = app => {
  const car = model(app.model, app.Sequelize);
  return car;
};
