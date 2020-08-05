'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  /**
    * @Controller 货物档案
   */

  /**
   *  @summary 获取货物信息
   *  @description 获取货物详细信息
   *  @router get /goods
   *  @request query string goods 货物名
   *  @request query number *i eg:1 页码
   *  @response 200 goodsResponse 获取成功
  */
  async search() {
    const { ctx, service } = this;
    const { result, total } = await service.record.goods.search(ctx.request.query);
    ctx.body = {
      status: 1,
      res: result,
      total: total[0].total,
    };
  }

  /**
 * @summary 添加货物信息
 * @description 添加货物信息
 * @router post /goods/add
 * @request body goodsAddRequest
 * @response 200 goodsAddResponse 添加成功
*/
  async add() {
    const { ctx, service } = this;
    const result = await service.record.goods.add(ctx.request.body);
    console.log(result);
    ctx.body = {
      status: result[1],
      res: result[0][0],
    };
  }

  /**
 * @summary 修改货物信息
 * @description 修改货物信息
 * @router post /goods/update
 * @request body goodsUpdateRequest
 * @response 200 goodsUpdateResponse 修改成功
*/

  async update() {
    const { ctx, service } = this;
    const result = await service.record.goods.update(ctx.request.body);
    ctx.body = {
      status: 1,
    };
  }

  /**
 * @summary 删除货物信息
 * @description 删除货物信息
 * @router post /goods/delete
 * @request body goodsDeleteRequest
 * @response 200 goodsDeleteResponse 删除成功
*/

  async delete() {
    const { ctx, service } = this;
    const result = await service.record.goods.delete(ctx.request.body);
    ctx.body = {
      status: 1,
    };
  }
}

module.exports = GoodsController;
