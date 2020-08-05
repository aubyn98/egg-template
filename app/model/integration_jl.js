
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/integration_jl'));
module.exports = app => {
  const integration_jl = model(app.model, app.Sequelize);
  return integration_jl;
};
