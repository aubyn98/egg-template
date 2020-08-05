'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {
  /**
    * @Controller 客户管理
   */

  /**
   *  @summary 获取客户
   *  @description 获取客户详细信息
   *  @router get /customer
   *  @request query string customerName 客户名
   *  @request query string simpleCode 简码
   *  @request query number *i eg:1 页码
   *  @response 200 customerResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.customer.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }


  /**
   *  @summary 获取所有客户
   *  @description 获取客户详细信息
   *  @router get /customer/all
   *  @request query string customerName 客户名
   *  @request query string simpleCode 简码
   *  @response 200 customerResponse 获取成功
  */

  async all() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.customer.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 添加客户
   *  @description 添加客户详细信息
   *  @router post /customer/add
   *  @request body customerAddRequest
   *  @response 200 customerAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const res = await this.service.record.customer.add(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 更新客户
   *  @description 更新客户详细信息
   *  @router post /customer/update
   *  @request body customerUpdateRequest *body
   *  @response 200 customerUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.customer.update(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }

  /**
   *  @summary 删除客户
   *  @description 删除客户
   *  @router post /customer/delete
   *  @request body customerDeleteRequest *body
   *  @response 200 customerDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.record.customer.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = CustomerController;
