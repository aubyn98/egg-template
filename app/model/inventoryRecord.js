
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/inventoryRecord'));
module.exports = app => {
  const inventoryRecord = model(app.model, app.Sequelize);
  return inventoryRecord;
};
