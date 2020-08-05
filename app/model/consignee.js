
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/consignee'));
module.exports = app => {
  const consignee = model(app.model, app.Sequelize);
  return consignee;
};
