'use strict';
const Service = require('egg').Service;
const fields = [ 'unit' ];
module.exports = class Unit extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { Unit } = ctx.model;
    const { Op } = app.Sequelize;
    let { unit, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = { unit: { [Op.like]: unit ? `%${unit}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await Unit.findAll({ where, ...page });
    let count = await Unit.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
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
    const { Unit } = ctx.model;
    const data = await Unit.create({
      ...options,
    }, { fields });
    return data;
  }

  async update(options) {
    const { ctx } = this;
    const { Unit } = ctx.model;
    const data = await Unit.update({
      ...options,
    }, { where: { id: options.id }, fields });
    return data;
  }

  async delete(options) {
    const { ctx } = this;
    const { Unit } = ctx.model;
    const data = await Unit.destroy({ where: { id: options.id } });
    return data;
  }

};
