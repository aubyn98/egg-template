
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/baseMsg'));
module.exports = app => {
  const baseMsg = model(app.model, app.Sequelize);
  return baseMsg;
};
