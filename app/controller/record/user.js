'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
    * @Controller 用户管理
   */

  /**
   *  @summary 获取用户
   *  @description 获取用户详细信息
   *  @router get /user
   *  @request query string userName 用户名
   *  @request query number *i eg:1 页码
   *  @response 200 userResponse 获取成功
  */

  async index() {
    const { ctx } = this;
    const { data: res, count: total } = await this.service.record.user.index(ctx.request.query);
    ctx.body = {
      status: 1,
      res,
      total,
    };
  }

  /**
   *  @summary 修改密码
   *  @description 修改密码
   *  @request body changePwRequest
   *  @response 200 changePwResponse
   *  @router post /changePw
  */
  async changePw() {
    const { ctx } = this;
    let data = await this.service.record.user.login(ctx.request.body);
    if (data.length > 0) {
      data = data[0];
      if (data.password === ctx.request.body.password) {
        const data = await this.service.record.user.changePw(ctx.request.body);
        if (data[0] === 1) {
          ctx.body = {
            status: 1,
            msg: '修改成功！',
          };
        } else {
          ctx.body = {
            status: 3,
            msg: '修改失败！',
          };
        }
      } else {
        ctx.body = {
          status: 2,
          msg: '密码错误！',
        };
      }
    } else {
      ctx.body = {
        status: -1,
        msg: '账号不存在',
      };
    }
  }

  /**
   *  @summary 登录
   *  @description 登录
   *  @request body loginRequest
   *  @response 200 loginResponse
   *  @router post /login
  */

  async login() {
    const { ctx } = this;
    let data = await this.service.record.user.login(ctx.request.body);
    if (data.length > 0) {
      data = data[0];
      if (data.password === ctx.request.body.password) {
        console.log(data);
        ctx.body = {
          status: 1,
          position: data.position,
          administrator: data.administrator,
          qx: data.auth,
          msg: '登录成功！',
        };
      } else {
        ctx.body = {
          status: 2,
          msg: '密码错误！',
        };
      }
    } else {
      ctx.body = {
        status: -1,
        msg: '账号不存在',
      };
    }

  }

  /**
   *  @summary 扫码
   *  @description 扫码
   *  @request body scanRequest
   *  @response 200 scanResponse
   *  @router post /scan
  */

  async scan() {
    const { ctx } = this;
    const data = await this.service.record.user.scan(ctx.request.body);
    ctx.body = {
      ...data,
    };

  }

  /**
   *  @summary 获取权限列表
   *  @description 获取权限列表
   *  @router get /auth
  */

  async auth() {
    const { ctx } = this;
    const { data: res } = await this.service.record.user.auth();
    ctx.body = res;
  }


  /**
   *  @summary 添加用户
   *  @description 添加用户详细信息
   *  @router post /user/add
   *  @request body userAddRequest *body
   *  @response 200 userAddResponse 获取成功
  */

  async add() {
    const { ctx } = this;
    const res = await this.service.record.user.add(ctx.request.body);
    ctx.body = {
      status: 1,
      res,
    };
  }


  /**
   *  @summary 更新用户
   *  @description 更新用户详细信息
   *  @router post /user/update
   *  @request body userUpdateRequest *body
   *  @response 200 userUpdateResponse 获取成功
  */

  async update() {
    const { ctx } = this;
    const status = await this.service.record.user.update(ctx.request.body);
    ctx.body = {
      status: status[0],
    };
  }

  /**
   *  @summary 删除用户
   *  @description 删除用户
   *  @router post /user/delete
   *  @request body userDeleteRequest *body
   *  @response 200 userDeleteResponse 获取成功
  */

  async delete() {
    const { ctx } = this;
    const status = await this.service.record.user.delete(ctx.request.body);
    ctx.body = {
      status,
    };
  }

}

module.exports = UserController;
