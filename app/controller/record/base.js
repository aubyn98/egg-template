'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  /**
    * @Controller 基础信息管理
   */

  /**
   *  @summary 获取基础信息
   *  @description 获取基础信息详细信息
   *  @router get /base
  */

  async index() {
    const { ctx } = this;
    const { data: res } = await this.service.record.base.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
    };
  }

  /**
   *  @summary 更新基础信息
   *  @description 更新基础信息详细信息
   *  @router post /base/update
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.base.update(ctx.request.body);
    ctx.body = {
      status: status[1],
    };
  }


}

module.exports = BaseController;
