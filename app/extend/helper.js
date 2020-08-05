'use strict';
const moment = require('moment');
module.exports = {
  moment(data, str) {
    return moment(data).format(str);
  },
};
