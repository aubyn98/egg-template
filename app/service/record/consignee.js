'use strict';
const Service = require('egg').Service;
const fields = [ 'consignee', 'simpleCode', 'goodsType', 'price', 'insured', 'payment', 'telephone', 'phone', 'discount', 'freight', 'line', 'address', 'remark' ];
module.exports = class Consignee extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { Consignee } = ctx.model;
    const { Op } = app.Sequelize;
    let { consignee, i, pageSize, telephone } = options;
    pageSize || (pageSize = 20);
    const where = { consignee: { [Op.like]: consignee ? `%${consignee}%` : '%%' }, telephone: { [Op.like]: telephone ? `%${telephone}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await Consignee.findAll({ where, ...page });
    let count = await Consignee.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
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
    const { Consignee } = ctx.model;
    const data = await Consignee.create({
      ...options,
    }, { fields });
    return data;
  }

  async updatePrice(options) {
    const { ctx } = this;
    const { fieldValue, positionValue, field, positionType, promptValue, type } = options;
    const { Consignee } = ctx.model;
    let data;
    if (type === 'same') {
      data = await this.update2(field, fieldValue, { [positionType]: positionValue });
    } else {
      let list = await Consignee.findAll({ where: { [positionType]: positionValue }, fields: [ field, 'id' ] });
      list = JSON.parse(JSON.stringify(list));
      for (const item of list) {
        if (type === 'add') {
          data = await this.update2(field, parseInt(item[field]) + parseInt(promptValue), { id: item.id });
        } else {
          data = await this.update2(field, parseInt(item[field]) - parseInt(promptValue), { id: item.id });
        }
      }
    }
    return data;
  }

  async update2(field, fieldValue, where) {
    const { ctx } = this;
    const { Consignee } = ctx.model;
    const data = await Consignee.update({
      [field]: fieldValue,
    }, { where, fields: [ field ] });
    return data;
  }

  async update(options) {
    const { ctx } = this;
    const { Consignee } = ctx.model;
    const data = await Consignee.update({
      ...options,
    }, { where: { id: options.id }, fields });
    return data;
  }

  async delete(options) {
    const { ctx } = this;
    const { Consignee } = ctx.model;
    const data = await Consignee.destroy({ where: { id: options.id } });
    return data;
  }

};
