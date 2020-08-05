
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/customer'));
module.exports = app => {
  const customer = model(app.model, app.Sequelize);
  return customer;
};
