
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/goods'));
module.exports = app => {
  const goods = model(app.model, app.Sequelize);
  return goods;
};
