
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/transport_jl'));
module.exports = app => {
  const transport_jl = model(app.model, app.Sequelize);
  return transport_jl;
};
