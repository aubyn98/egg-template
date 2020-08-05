'use strict';
const path = require('path');
const config = {
  userName: 'sa',
  password: 'adminlysoft',
  /* username: 'sa', // mysql
  password: 'adminlysoft', */
  database: 'hy_blank',
  // 数据库ip地址
  host: '127.0.0.1',
  dialect: 'mssql',
  dialectOptions: {
    // 数据库实例名称，没有则不用设置
    // instanceName: 'SQLEXPRESS',
    // 身份验证
    authentication: {
      type: 'default',
      options: {
        // mssql
        userName: 'sa',
        password: 'adminlysoft',
      },
    },
  },
  // 定义表名的前缀，不设置此属性，则没有前缀
  define: {
    // schema: 'core',
    timestamps: false,
    createdAt: 'CreatedAt', // 自定义时间戳
    updatedAt: 'UpdatedAt', // 自定义时间戳
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  port: 1686,
};
const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(config.database, config.userName, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: config.dialectOptions,
  define: config.define,
  pool: config.pool,
  port: config.port,
  timezone: '+08:00',
  output: path.resolve(__dirname, './app/model'),
  enablerithabort: false,
  // ...
});
auto.run(function(err) {
  if (err) {
    console.log(1);
  }
});
/**
  * node_modules\sequelize-auto\node_modules\sequelize\lib\dialects\mssql\connection-manager.js
  *
  *        的ConnectionManager.prototype.connect的connectionConfig添加
  *
  *          authentication : config.dialectOptions.authentication
*/
