'use strict';
const Controller = require('egg').Controller;
const wechat = require('co-wechat');
class UserController extends Controller {
  async index() {
    this.ctx.body = 1;
  }
}
module.exports = UserController;
