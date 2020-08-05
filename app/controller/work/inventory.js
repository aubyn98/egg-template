'use strict';

const Controller = require('egg').Controller;

class InventoryController extends Controller {
  /**
    * @Controller 货运清单管理
   */

  /**
   *  @summary 获取货运清单
   *  @description 获取货运清单详细信息
   *  @router post /inventory
   *  @request body inventoryRequest
   *  @response 200 inventoryResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.work.inventory.index(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 添加货运清单
   *  @description 添加货运清单详细信息
   *  @router post /inventory/add
   *  @request body inventoryAddRequest
   *  @response 200 inventoryAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const status = await this.service.work.inventory.add(ctx.request.body);
    ctx.body = {
      ...status,
    };
  }


  /**
   *  @summary 更新货运清单
   *  @description 更新货运清单详细信息
   *  @router post /inventory/update
   *  @request body inventoryUpdateRequest *body
   *  @response 200 inventoryUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.work.inventory.update(ctx.request.body);
    ctx.body = {
      ...status,
    };
  }

  /**
   *  @summary 删除货运清单
   *  @description 删除货运清单
   *  @router post /inventory/delete
   *  @request body inventoryDeleteRequest *body
   *  @response 200 inventoryDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.work.inventory.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = InventoryController;
