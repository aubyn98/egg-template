/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
const fs = require('fs');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588815435018_4518';

  // add your middleware config here
  config.middleware = [ 'switchDB', 'error' ];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    wxconf: { appid: 'wx2fc6f9b281b5d684', appsecret: 'd3df4c0dfa86499d7f94f93e3a999950', token: 'lysoft' },
    // switchDB: { enable: false },
    gzip: { enable: false },
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../app/public/favicon_logo.ico')),
  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    maxAge: 315,
  };
  config.address = 'http://192.168.2.252:5000';
  config.sequelize = {
    username: 'sa',
    password: 'adminlysoft',
    database: 'hy',
    // 数据库ip地址
    host: '127.0.0.1',
    dialect: 'mssql',
    dialectOptions: {
      // 数据库实例名称，没有则不用设置
      // instanceName: 'SQLEXPRESS',
      multipleStatements: true,
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
  return {
    ...config,
    ...userConfig,
  };
};
