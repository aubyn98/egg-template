'use strict';

const Controller = require('egg').Controller;

class ConsigneeController extends Controller {
  /**
    * @Controller 收货人管理
   */

  /**
   *  @summary 获取收货人
   *  @description 获取收货人详细信息
   *  @router get /consignee
   *  @request query string consignee 收货人
   *  @request query string simpleCode 简码
   *  @request query number *i eg:1 页码
   *  @response 200 consigneeResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.consignee.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }


  /**
   *  @summary 获取所有收货人
   *  @description 获取收货人详细信息
   *  @router get /consignee/all
   *  @request query string consignee 收货人
   *  @request query string simpleCode 简码
   *  @response 200 consigneeResponse 获取成功
  */

  async all() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.consignee.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 添加收货人
   *  @description 添加收货人详细信息
   *  @router post /consignee/add
   *  @request body consigneeAddRequest
   *  @response 200 consigneeAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const res = await this.service.record.consignee.add(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 更新收货人
   *  @description 更新收货人详细信息
   *  @router post /consignee/update
   *  @request body consigneeUpdateRequest *body
   *  @response 200 consigneeUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.consignee.update(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }


  /**
   *  @summary 更新同地区单价 / 保价
   *  @description 更新同地区单价或保价
   *  @router post /consignee/updatePrice
  */
  async updatePrice() {
    const { ctx } = this;
    const status = await this.service.record.consignee.updatePrice(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }

  /**
   *  @summary 删除收货人
   *  @description 删除收货人
   *  @router post /consignee/delete
   *  @request body consigneeDeleteRequest *body
   *  @response 200 consigneeDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.record.consignee.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = ConsigneeController;
