'use strict';

const Controller = require('egg').Controller;

class UnitController extends Controller {
  /**
    * @Controller 单位管理
   */

  /**
   *  @summary 获取单位
   *  @description 获取单位详细信息
   *  @router get /unit
   *  @request query string unit 单位
   *  @request query number *i eg:1 页码
   *  @response 200 unitResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.unit.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 获取所有单位
   *  @description 获取单位详细信息
   *  @router get /unit/all
   *  @request query string unit 单位
   *  @response 200 unitResponse 获取成功
  */

  async all() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.unit.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 添加单位
   *  @description 添加单位详细信息
   *  @router post /unit/add
   *  @request body unitAddRequest
   *  @response 200 unitAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const res = await this.service.record.unit.add(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 更新单位
   *  @description 更新单位详细信息
   *  @router post /unit/update
   *  @request body unitUpdateRequest *body
   *  @response 200 unitUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.unit.update(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }

  /**
   *  @summary 删除单位
   *  @description 删除单位
   *  @router post /unit/delete
   *  @request body unitDeleteRequest *body
   *  @response 200 unitDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.record.unit.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = UnitController;
