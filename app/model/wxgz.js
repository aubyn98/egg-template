
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/wxgz'));
module.exports = app => {
  const wxgz = model(app.model, app.Sequelize);
  return wxgz;
};
