'use strict';

const Controller = require('egg').Controller;

class IntegrationController extends Controller {
  /**
    * @Controller 货运单整合管理
   */

  /**
   *  @summary 获取货运单整合
   *  @description 获取货运单整合详细信息
   *  @router post /integration
   *  @request body integrationRequest
   *  @response 200 integrationResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.work.integration.index(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 获取货运单整合统计
   *  @description 获取货运单整合统计信息
   *  @request body integrationRequest
   *  @router post /integration/join
  */

  async join() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.work.integration.join(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 获取货运单
   *  @description 根据单号获取货运单信息
   *  @request query string dh
   *  @router get /integration/findByDh
  */

  async findByDh() {
    const { ctx } = this;
    const { data: res, status } = await this.service.work.integration.findByDh(ctx.request.query);
    ctx.body = {
      status,
      res,
    };
  }


  /**
   *  @summary 添加货运单整合
   *  @description 添加货运单整合详细信息
   *  @router post /integration/add
   *  @request body integrationAddRequest
   *  @response 200 integrationAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const data = await this.service.work.integration.add(ctx.request.body);
    ctx.body = {
      ...data,
    };
  }


  /**
   *  @summary 更新货运单整合
   *  @description 更新货运单整合详细信息
   *  @router post /integration/update
   *  @request body integrationUpdateRequest *body
   *  @response 200 integrationUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const data = await this.service.work.integration.update(ctx.request.body);
    ctx.body = {
      ...data,
    };
  }

  /**
   *  @summary 删除货运单整合
   *  @description 删除货运单整合
   *  @router post /integration/delete
   *  @request body integrationDeleteRequest *body
   *  @response 200 integrationDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.work.integration.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = IntegrationController;
