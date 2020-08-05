
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/lsh'));
module.exports = app => {
  const lsh = model(app.model, app.Sequelize);
  return lsh;
};
