'use strict';
const Service = require('egg').Service;
const fields = ['customerName', 'simpleCode', 'liaison', 'telephone', 'phone', 'fax', 'freight', 'address', 'remark'];
module.exports = class Customer extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { Customer } = ctx.model;
    const { Op } = app.Sequelize;
    let { customerName, i, pageSize, telephone } = options;
    pageSize || (pageSize = 20);
    const where = { customerName: { [Op.like]: customerName ? `%${customerName}%` : '%%' }, telephone: { [Op.like]: telephone ? `%${telephone}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await Customer.findAll({ where, ...page });
    let count = await Customer.findAll({ where, attributes: [[ctx.model.fn('COUNT', ctx.model.col('*')), 'count']] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }
    return {
      data,
      count,
    };
  }

  async add(options) {
    const { ctx } = this;
    const { Customer } = ctx.model;
    const data = await Customer.create({
      ...options,
    }, { fields });
    return data;
  }

  async update(options) {
    const { ctx } = this;
    const { Customer } = ctx.model;
    const data = await Customer.update({
      ...options,
    }, { where: { id: options.id }, fields });
    return data;
  }

  async delete(options) {
    const { ctx } = this;
    const { Customer } = ctx.model;
    const data = await Customer.destroy({ where: { id: options.id } });
    return data;
  }

};
