'use strict';
const Service = require('egg').Service;
module.exports = class Unit extends Service {

  async startStation(options) {
    const { ctx, app } = this;
    const { StartStation } = ctx.model;
    const { Op } = app.Sequelize;
    let { startStation, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = { startStation: { [Op.like]: startStation ? `%${startStation}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await StartStation.findAll({ where, ...page });
    let count = await StartStation.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }
    return {
      data,
      count,
    };
  }
  async endStation(options) {
    const { ctx, app } = this;
    const { EndStation } = ctx.model;
    const { Op } = app.Sequelize;
    let { endStation, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = { endStation: { [Op.like]: endStation ? `%${endStation}%` : '%%' } };
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    const data = await EndStation.findAll({ where, ...page });
    let count = await EndStation.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }
    return {
      data,
      count,
    };
  }
};
