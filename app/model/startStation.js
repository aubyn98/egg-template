
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/startStation'));
module.exports = app => {
  const startStation = model(app.model, app.Sequelize);
  return startStation;
};
