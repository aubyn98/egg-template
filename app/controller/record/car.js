'use strict';

const Controller = require('egg').Controller;

class CarController extends Controller {
  /**
    * @Controller 货车管理
   */

  /**
   *  @summary 获取货车
   *  @description 获取货车详细信息
   *  @router get /car
   *  @request query string carType 货车种类
   *  @request query string carNumber 车号
   *  @request query string register 挂号
   *  @request query string company 单位
   *  @request query string driver 司机
   *  @request query number *i eg:1 页码
   *  @response 200 carResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.car.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 获取所有货车  不分页
   *  @description 获取所有货车详细信息
   *  @router get /car/all
   *  @request query string carType 货车种类
   *  @request query string carNumber 车号
   *  @request query string register 挂号
   *  @request query string company 单位
   *  @request query string driver 司机
   *  @response 200 carResponse 获取成功
  */

  async all() {
    const { ctx } = this;
    const res = await this.service.record.car.index(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 添加货车
   *  @description 添加货车详细信息
   *  @router post /car/add
   *  @request body carAddRequest
   *  @response 200 carAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const res = await this.service.record.car.add(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 更新货车
   *  @description 更新货车详细信息
   *  @router post /car/update
   *  @request body carUpdateRequest *body
   *  @response 200 carUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.car.update(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }

  /**
   *  @summary 删除货车
   *  @description 删除货车
   *  @router post /car/delete
   *  @request body carDeleteRequest *body
   *  @response 200 carDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.record.car.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = CarController;
