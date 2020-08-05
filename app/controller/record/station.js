'use strict';

const Controller = require('egg').Controller;

class UnitController extends Controller {
  /**
    * @Controller 常用站点管理
   */

  /**
   *  @summary 获取始发站
   *  @description 获取始发站
   *  @router get /startStation
   *  @request query string startStation 始发站
   *  @response 200 startStationResponse 获取成功
  */

  async startStation() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.station.startStation(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 获取始发站
   *  @description 获取始发站
   *  @router get /endStation
   *  @request query string endStation 始发站
   *  @response 200 endStationResponse 获取成功
  */
  async endStation() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.station.endStation(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

}

module.exports = UnitController;
