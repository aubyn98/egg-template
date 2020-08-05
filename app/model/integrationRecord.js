
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/integrationRecord'));
module.exports = app => {
  const integrationRecord = model(app.model, app.Sequelize);
  return integrationRecord;
};
