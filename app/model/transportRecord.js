
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/transportRecord'));
module.exports = app => {
  const transportRecord = model(app.model, app.Sequelize);
  return transportRecord;
};
