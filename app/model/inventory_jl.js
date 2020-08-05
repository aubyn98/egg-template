
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/inventory_jl'));
module.exports = app => {
  const inventory_jl = model(app.model, app.Sequelize);
  return inventory_jl;
};
