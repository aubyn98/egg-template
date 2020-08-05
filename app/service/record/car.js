'use strict';
const Service = require('egg').Service;
const fields = [ 'carType', 'carNumber', 'register', 'company', 'driver', 'license', 'phone', 'remark' ];
module.exports = class Car extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { Car } = ctx.model;
    const { Op } = app.Sequelize;
    let { carType, carNumber, register, company, driver, phone, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = { carType: { [Op.like]: carType ? `%${carType}%` : '%%' }, carNumber: { [Op.like]: carNumber ? `%${carNumber}%` : '%%' }, register: { [Op.like]: register ? `%${register}%` : '%%' }, company: { [Op.like]: company ? `%${company}%` : '%%' }, driver: { [Op.like]: driver ? `%${driver}%` : '%%' }, phone: { [Op.like]: phone ? `%${phone}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await Car.findAll({ where, ...page });
    let count = await Car.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
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
    const { Car } = ctx.model;
    const data = await Car.create({
      ...options,
    }, { fields });
    return data;
  }

  async update(options) {
    const { ctx } = this;
    const { Car } = ctx.model;
    const data = await Car.update({
      ...options,
    }, { where: { id: options.id }, fields });
    return data;
  }

  async delete(options) {
    const { ctx } = this;
    const { Car } = ctx.model;
    const data = await Car.destroy({ where: { id: options.id } });
    return data;
  }

};
