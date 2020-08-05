
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/unit'));
module.exports = app => {
  const unit = model(app.model, app.Sequelize);
  return unit;
};
