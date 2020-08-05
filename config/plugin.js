'use strict';
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  swaggerdoc: { enable: true, package: 'egg-swagger-doc-feat' },
  aubynUtil: {
    enable: true,
    package: 'aubyn-util',
  },
};
