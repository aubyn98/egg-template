
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/endStation'));
module.exports = app => {
  const endStation = model(app.model, app.Sequelize);
  return endStation;
};
