'use strict';
const Service = require('egg').Service;
const fields = [ 'userName', 'password', 'position', 'remark', 'auth', 'administrator' ];
module.exports = class User extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { User } = ctx.model;
    const { Op } = app.Sequelize;
    let { userName, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = { userName: { [Op.like]: userName ? `%${userName}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await User.findAll({ where, ...page });
    let count = await User.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }
    return {
      data,
      count,
    };
  }

  async changePw(options) {
    const { ctx } = this;
    const { User } = ctx.model;
    const data = await User.update({ password: options.newPassword }, { where: { userName: options.userName }, fields: [ 'password' ] });
    return JSON.parse(JSON.stringify(data));
  }

  async login(options) {
    const { ctx } = this;
    const { User } = ctx.model;
    const data = await User.findAll({ where: { userName: options.userName } });
    return JSON.parse(JSON.stringify(data));
  }

  async scan(options) {
    const o = {
      status: 1,
      msg: '扫码成功！',
    };
    try {
      const { position, bm } = options;
      const { TransportRecord, InventoryJl } = this.ctx.model;
      const timeStamp = this.ctx.helper.moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
      // 根据扫到的码 找到对应清单的单号
      let kddh;
      if (bm.includes('KD')) {
        kddh = await InventoryJl.findAll({ where: { kddh: bm } });
      } else {
        kddh = await InventoryJl.findAll({ where: { id2: bm } });
      }
      if (kddh && kddh.length > 0) {
        kddh = JSON.parse(JSON.stringify(kddh))[0].kddh;
        // 根据单号找到该清单的所有数据
        const arr = await InventoryJl.findAll({ where: { kddh } });
        for (const item of arr) {
          // 循环找到的所有数据更新运单的位置信息
          TransportRecord.update({ position }, { where: { id: item.id2 }, fields: [ 'position' ] });
          let arr2 = await TransportRecord.findAll({ where: { id: item.id2 } });
          arr2 = JSON.parse(JSON.stringify(arr2));
          if (arr2.length > 0) {
            for (const j of arr2) {
              this.ctx.$query(`insert into logistics(bm,position,time) values('${j.dh}','${position}','${timeStamp}')`);
            }
          }
        }
      } else {
        const d = await TransportRecord.update({ position }, { where: { id: bm }, fields: [ 'position', 'dh' ] });
        let d2 = await TransportRecord.findAll({ where: { id: bm }, fields: [ 'dh' ] });
        d2 = JSON.parse(JSON.stringify(d2));
        if (d2 && d2.length > 0) {
          this.ctx.$query(`insert into logistics(bm,position,time) values('${d2[0].dh}','${position}','${timeStamp}')`);
        }
        o.status = d[0];
        o.msg = !d[0] ? '扫码失败！' : '扫码成功！';
      }
      return o;
    } catch (e) {
      console.log(e);
      o.status = 0;
      o.msg = '扫码失败！';
      o.error = e;
      return o;
    }

  }

  async auth() {
    const { ctx } = this;
    const { Auth } = ctx.model;
    const data = await Auth.findAll();
    return {
      data,
    };
  }

  async add(options) {
    const { ctx } = this;
    const { User } = ctx.model;
    const data = await User.create({
      ...options,
    }, { fields });
    return data;
  }

  async update(options) {
    const { ctx } = this;
    const { User } = ctx.model;
    const data = await User.update({
      ...options,
    }, { where: { id: options.id }, fields });
    return data;
  }

  async delete(options) {
    const { ctx } = this;
    const { User } = ctx.model;
    const data = await User.destroy({ where: { id: options.id } });
    return data;
  }

};
