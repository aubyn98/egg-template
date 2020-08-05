'use strict';
const Service = require('egg').Service;
const fields = [ 'kddh', 'startStation', 'endStation', 'carNumber', 'remark', 'creator', 'date', 'date2', 'state', 'register', 'driver' ];
const fields2 = [ 'kddh', 'kddhdate', 'customerName', 'consignee', 'dh', 'kddh2', 'endStation', 'consigneeAddress', 'num', 'quantity', 'collection', 'insured', 'otherPrice',
  'payee', 'receipts', 'payeeDate', 'sum', 'discount', 'transferFee', 'deliveryFee', 'payment', 'state', 'remark', 'jlid', 'id2' ];
module.exports = class InventoryRecord extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { InventoryRecord, InventoryJl } = ctx.model;
    const { Op } = app.Sequelize;
    let { dh, startDate, endDate, startStation, endStation, customer, consignee, payment, state, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = {
      state: { [Op.like]: state ? `%${state}%` : '%%' },
    };
    if (startStation && startStation.length > 0) {
      where.startStation = { [Op.in]: startStation };
    }
    if (endStation && endStation.length > 0) {
      where.endStation = { [Op.in]: endStation };
    }
    if (startDate && endDate) {
      where.date = { [Op.between]: [ startDate, endDate ] };
    }
    let kddhArr = [];
    if (dh) {
      let kddhCondition = await InventoryJl.findAll({ where: { dh }, attributes: [ 'kddh' ] });
      if (kddhCondition.length > 0) {
        kddhCondition = JSON.parse(JSON.stringify(kddhCondition));
        kddhCondition = kddhCondition.map(item => item.kddh);
        kddhCondition = Array.from(new Set(kddhCondition));
      } else {
        return {
          data: [],
          count: 0,
        };
      }
      kddhArr = kddhCondition;
    }
    if (customer) {
      let kddhCondition = await InventoryJl.findAll({ where: { customer: { [Op.like]: `%${customer}%` } }, attributes: [ 'kddh' ] });
      if (kddhCondition.length > 0) {
        kddhCondition = JSON.parse(JSON.stringify(kddhCondition));
        kddhCondition = kddhCondition.map(item => item.kddh);
        kddhCondition = Array.from(new Set(kddhCondition));
      } else {
        return {
          data: [],
          count: 0,
        };
      }
      kddhArr.push(kddhCondition);
    }
    if (consignee) {
      let kddhCondition = await InventoryJl.findAll({ where: { consignee: { [Op.like]: `%${consignee}%` } }, attributes: [ 'kddh' ] });
      if (kddhCondition.length > 0) {
        kddhCondition = JSON.parse(JSON.stringify(kddhCondition));
        kddhCondition = kddhCondition.map(item => item.kddh);
        kddhCondition = Array.from(new Set(kddhCondition));
      } else {
        return {
          data: [],
          count: 0,
        };
      }
      kddhArr.push(kddhCondition);
    }
    if (payment) {
      let kddhCondition = await InventoryJl.findAll({ where: { payment }, attributes: [ 'kddh' ] });
      if (kddhCondition.length > 0) {
        kddhCondition = JSON.parse(JSON.stringify(kddhCondition));
        kddhCondition = kddhCondition.map(item => item.kddh);
        kddhCondition = Array.from(new Set(kddhCondition));
      } else {
        return {
          data: [],
          count: 0,
        };
      }
      kddhArr.push(kddhCondition);
    }
    if (kddhArr.length > 0) {
      kddhArr = Array.from(new Set(kddhArr));
      where.kddh = { [Op.in]: kddhArr };
    }
    let count = await InventoryRecord.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('kddh')), 'count' ]] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    let data = await InventoryRecord.findAll({ where, ...page });
    data = JSON.parse(JSON.stringify(data));
    for (const item of data) {
      item.dataList = await InventoryJl.findAll({ where: { kddh: item.kddh } });
    }
    return {
      data,
      count,
    };
  }

  async add(options) {
    const { ctx } = this;
    const { InventoryRecord, InventoryJl, IntegrationJl, StartStation, EndStation } = ctx.model;
    const date2 = ctx.helper.moment(new Date(), 'YYYY-MM-DD');
    let list = await InventoryRecord.findAll({ where: { date2 }, order: [[ 'kddh', 'DESC' ]], limit: 1, attributes: [ 'kddh' ] });
    list = JSON.parse(JSON.stringify(list));
    let num;
    if (list.length > 0) {
      num = parseFloat(list[0].kddh.substring(8));
      num += 1;
    } else {
      num = 1;
    }
    const count = num.toString().padStart(4, '0');
    const kddh = 'KD' + ctx.helper.moment(new Date(), 'YYYYMMDD').substring(2) + count;
    const record = {};
    let dataList = [];
    Object.keys(options).forEach(key => {
      if (key !== 'dataList') {
        record[key] = options[key];
      } else {
        if (typeof options.dataList === 'object') { dataList = options.dataList; } else {
          dataList = options.dataList && JSON.parse(options.dataList);
        }
      }
    });
    // 查找始发站和到货站档案  是否存在
    StartStation.findCreateFind({ where: { startStation: options.startStation }, defaults: { startStation: options.startStation } });
    EndStation.findCreateFind({ where: { endStation: options.endStation }, defaults: { endStation: options.endStation } });
    const res = await InventoryRecord.create({
      ...record,
      kddh,
      date2,
    }, { fields });
    try {
      for (const item of dataList) {
        await InventoryJl.create({
          ...item,
          kddh,
        }, { fields2 });
        IntegrationJl.update({ state: 1 }, { where: { id: item.jlid }, fields: [ 'state' ] });
      }
      return {
        status: 1,
        msg: '保存成功！',
        res,
      };
    } catch (e) {
      console.log(e);
      await InventoryRecord.destroy({ where: { kddh } });
      return {
        status: 0,
        msg: '保存失败！',
        res: [],
        error: e,
      };
    }
  }

  async update(options) {
    const { ctx } = this;
    const { InventoryRecord, InventoryJl } = ctx.model;
    const record = {};
    let dataList = [];
    Object.keys(options).forEach(key => {
      if (key !== 'dataList' && key !== 'kddh') {
        record[key] = options[key];
      } else if (key === 'dataList') {
        if (typeof options.dataList === 'object') { dataList = options.dataList; } else {
          dataList = options.dataList && JSON.parse(options.dataList);
        }
      }
    });
    let preRecord = await InventoryRecord.findAll({ where: { kddh: options.kddh } });
    let preJl = await InventoryJl.findAll({ where: { kddh: options.kddh } });
    preJl = JSON.parse(JSON.stringify(preJl));
    preRecord = JSON.parse(JSON.stringify(preRecord));
    try {
      await InventoryJl.destroy({ where: { kddh: options.kddh } });
      await InventoryRecord.update({
        ...options,
      }, { where: { kddh: options.kddh }, fields });
      for (const item of dataList) {
        await InventoryJl.create({
          ...item,
          kddh: options.kddh,
        }, { fields2 });
      }
      return {
        status: 1,
        msg: '保存成功',
      };
    } catch (e) {
      console.log(e);
      if (preRecord.length > 0) {
        const o = {};
        Object.keys(preRecord[0]).forEach(key => {
          if (key !== 'id') {
            o[key] = preRecord[0][key];
          }
        });
        await InventoryRecord.update({
          ...o,
        }, { where: { kddh: options.kddh }, fields });
      }
      if (preJl.length > 0) {
        await InventoryJl.destroy({ where: { kddh: options.kddh } });
        for (const item of preJl) {
          await InventoryJl.create({
            ...item,
          }, { fields2 });
        }
      }
      return {
        status: 0,
        msg: '保存失败！',
        error: e,
      };
    }
  }

  async delete(options) {
    const { ctx } = this;
    const { InventoryRecord, IntegrationJl } = ctx.model;
    const data = await InventoryRecord.destroy({ where: { kddh: options.kddh } });
    for (const item of options.jlidArr) {
      await IntegrationJl.update({ state: 0 }, { where: { id: item }, fields: [ 'state' ] });
    }
    return data;
  }

};
