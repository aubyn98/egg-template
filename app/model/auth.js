
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/auth'));
module.exports = app => {
  const auth = model(app.model, app.Sequelize);
  return auth;
};
