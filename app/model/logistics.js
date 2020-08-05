
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/logistics'));
module.exports = app => {
  const logistics = model(app.model, app.Sequelize);
  return logistics;
};
