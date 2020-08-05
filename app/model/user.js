
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/user'));
module.exports = app => {
  const user = model(app.model, app.Sequelize);
  return user;
};
