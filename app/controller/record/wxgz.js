'use strict';

const Controller = require('egg').Controller;

class WxgzController extends Controller {
  /**
    * @Controller 公众号内容管理
   */

  /**
   *  @summary 获取公众号内容
   *  @description 获取公众号内容详细信息
   *  @router get /wxgz
   *  @request query string wxgz 公众号内容
   *  @request query number *i eg:1 页码
   *  @response 200 wxgzResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res } = await this.service.record.wxgz.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
    };
  }

  /**
   *  @summary 获取所有公众号内容
   *  @description 获取公众号内容详细信息
   *  @router get /wxgz/all
   *  @request query string wxgz 公众号内容
   *  @response 200 wxgzResponse 获取成功
  */

  async all() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.wxgz.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 添加公众号内容
   *  @description 添加公众号内容详细信息
   *  @router post /wxgz/add
   *  @request body wxgzAddRequest
   *  @response 200 wxgzAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const res = await this.service.record.wxgz.add(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 更新公众号内容
   *  @description 更新公众号内容详细信息
   *  @router post /wxgz/update
   *  @request body wxgzUpdateRequest *body
   *  @response 200 wxgzUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.wxgz.update(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }

  /**
   *  @summary 删除公众号内容
   *  @description 删除公众号内容
   *  @router post /wxgz/delete
   *  @request body wxgzDeleteRequest *body
   *  @response 200 wxgzDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.record.wxgz.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = WxgzController;
