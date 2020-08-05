'use strict';

const Controller = require('egg').Controller;

class TransportController extends Controller {
  /**
    * @Controller 货运单管理
   */

  /**
   *  @summary 获取货运单
   *  @description 获取货运单详细信息
   *  @router post /transport
   *  @request body transportRequest
   *  @response 200 transportResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.work.transport.index(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 获取货运单统计
   *  @description 获取货运单统计信息
   *  @request body transportRequest
   *  @router post /transport/join
  */

  async join() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.work.transport.join(ctx.request.body);
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
   *  @router get /transport/findById
  */

  async findById() {
    const { ctx } = this;
    const { data: res, status } = await this.service.work.transport.findById(ctx.request.query);
    ctx.body = {
      status,
      res,
    };
  }

  /**
   *  @summary 添加货运单
   *  @description 添加货运单详细信息
   *  @router post /transport/add
   *  @request body transportAddRequest
   *  @response 200 transportAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const data = await this.service.work.transport.add(ctx.request.body);
    ctx.body = {
      ...data,
    };
  }


  /**
   *  @summary 更新货运单
   *  @description 更新货运单详细信息
   *  @router post /transport/update
   *  @request body transportUpdateRequest *body
   *  @response 200 transportUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const data = await this.service.work.transport.update(ctx.request.body);
    ctx.body = {
      ...data,
    };
  }

  /**
   *  @summary 删除货运单
   *  @description 删除货运单
   *  @router post /transport/delete
   *  @request body transportDeleteRequest *body
   *  @response 200 transportDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.work.transport.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = TransportController;
