'use strict';
const Service = require('egg').Service;
const fields = [ 'kddh', 'startStation', 'endStation', 'carNumber', 'remark', 'creator', 'date', 'date2', 'driver', 'register' ];
const fields2 = [ 'kddh', 'dh', 'date', 'startStation', 'endStation', 'customerName', 'customerAddress', 'consignee', 'consigneeAddress', 'payment', 'goods', 'num',
  'quantity', 'collection', 'unit', 'price', 'money', 'insured', 'insuredSum', 'insuredRatio', 'otherPrice', 'discount', 'transferFee', 'deliveryFee', 'sum', 'state', 'remark', 'jlid', 'id2' ];
module.exports = class IntegrationRecord extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { IntegrationRecord, IntegrationJl } = ctx.model;
    const { Op } = app.Sequelize;
    let { dh, startDate, endDate, startStation, endStation, customerName, consignee, payment, state, i, pageSize } = options;
    pageSize || (pageSize = 20);
    const where = {};
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
      let kddhCondition = await IntegrationJl.findAll({ where: { dh }, attributes: [ 'kddh' ] });
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
    if (customerName) {
      let kddhCondition = await IntegrationJl.findAll({ where: { customerName: { [Op.like]: `%${customerName}%` } }, attributes: [ 'kddh' ] });
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
      kddhArr.push(...kddhCondition);
    }

    if (consignee) {
      let kddhCondition = await IntegrationJl.findAll({ where: { consignee: { [Op.like]: `%${consignee}%` } }, attributes: [ 'kddh' ] });
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
      kddhArr.push(...kddhCondition);
    }
    if (payment) {
      let kddhCondition = await IntegrationJl.findAll({ where: { payment }, attributes: [ 'kddh' ] });
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
      kddhArr.push(...kddhCondition);
    }
    if (state) {
      let stateCondition = await IntegrationJl.findAll({ where: { state }, attributes: [ 'state' ] });
      if (stateCondition.length > 0) {
        stateCondition = JSON.parse(JSON.stringify(stateCondition));
        stateCondition = stateCondition.map(item => item.state);
        stateCondition = Array.from(new Set(stateCondition));
      } else {
        return {
          data: [],
          count: 0,
        };
      }
      kddhArr.push(...stateCondition);
    }
    if (kddhArr.length > 0) {
      kddhArr = Array.from(new Set(kddhArr));
      where.kddh = { [Op.in]: kddhArr };
    }
    let count = await IntegrationRecord.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('kddh')), 'count' ]] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};
    let data = await IntegrationRecord.findAll({ where, ...page });
    data = JSON.parse(JSON.stringify(data));
    for (const item of data) {
      item.dataList = await IntegrationJl.findAll({ where: { kddh: item.kddh } });
    }
    return {
      data,
      count,
    };
  }

  async join(options) {
    const { ctx } = this;
    let { startDate, endDate, startStation, endStation, customerName, consignee, payment, state, goods, i, pageSize, dh } = options;
    pageSize || (pageSize = 20);
    let where = 'where ';
    if (startDate && endDate) {
      where += `a.date between '${startDate}' and '${endDate}' `;
    }
    if (startStation && startStation.length > 0) {
      where += `and a.startStation in ('${startStation.join('\',\'')}') `;
    }
    if (endStation && endStation.length > 0) {
      where += `and b.endStation in ('${endStation.join('\',\'')}') `;
    }
    if (customerName) {
      where += `and b.customerName like '%${customerName}%' `;
    }
    if (consignee) {
      where += `and b.consignee like '%${consignee}%' `;
    }
    if (payment) {
      where += `and b.payment like '%${payment}%' `;
    }
    if (state) {
      where += `and b.state = ${state} `;
    }
    if (goods) {
      where += `and b.goods like '%${goods}%' `;
    }
    if (dh) {
      where += `and b.dh like '%${dh}%' `;
    }
    const sort = ' order by kddh desc';
    let sql = `select b.id as jlid,a.kddh,b.dh,b.id2,a.date,a.startStation,b.customerName,b.endStation,b.consigneeAddress,b.consignee,
    b.goods,b.unit,b.num,b.quantity,b.insured,b.[collection],b.otherPrice,b.[sum],b.transferFee,b.deliveryFee,b.discount,a.carNumber,a.driver,a.register,b.remark,b.[state],b.payment from integrationRecord as a right join integration_jl as b on a.kddh = b.kddh  `;
    if (where.length > 7) {
      sql += where;
    }
    let str;
    if (i) {
      str = `select * from (select ROW_NUMBER() over(order by dh) as rowNum,* from ( ${sql}  )as r)as f where rowNum >= ${(i - 1) * pageSize + 1} and rowNum <= ${i * pageSize} ${sort}`;
    } else {
      str = sql;
    }
    const data = await ctx.$query(str);
    /* for (const item of data) {
      const record = await ctx.$query(`select * from transportRecord where dh = '${item.dh}'`);
      const jl = await ctx.$query(`select * from transport_jl where dh = '${item.dh}'`);
      item.msg = record[0];
      item.msg.dataList = jl;
    } */
    const str2 = `select COUNT(*)as count from ( ${sql} )as d`;
    let count = await ctx.$query(str2);
    if (count) {
      count = count[0].count;
    } else {
      count = 0;
    }
    return {
      count,
      data,
    };
  }


  async findByDh(options) {
    const { ctx } = this;
    const { IntegrationRecord, IntegrationJl } = ctx.model;
    const { kddh } = options;
    let data = await IntegrationRecord.findAll({ where: { kddh } });
    if (data.length > 0) {
      data = JSON.parse(JSON.stringify(data))[0];
      data.dataList = await IntegrationJl.findAll({ where: { kddh } });
      return {
        data,
        status: 1,
      };
    }
    return {
      status: 0,
    };
  }

  async add(options) {
    const { ctx } = this;
    const { IntegrationRecord, IntegrationJl, TransportJl, StartStation, EndStation } = ctx.model;
    const date2 = ctx.helper.moment(new Date(), 'YYYY-MM-DD');
    let list = await IntegrationRecord.findAll({ where: { date2 }, order: [[ 'kddh', 'DESC' ]], limit: 1, attributes: [ 'kddh' ] });
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
    const res = await IntegrationRecord.create({
      ...record,
      kddh,
      date2,
    }, { fields });
    try {
      for (const item of dataList) {
        await IntegrationJl.create({
          ...item,
          kddh,
        }, { fields2 });
        TransportJl.update({ state: 1 }, { where: { id: item.jlid }, fields: [ 'state' ] });
      }
      return {
        status: 1,
        msg: '保存成功！',
        res,
      };
    } catch (e) {
      console.log(e);
      await IntegrationRecord.destroy({ where: { kddh } });
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
    const { IntegrationRecord, IntegrationJl } = ctx.model;
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
    let preRecord = await IntegrationRecord.findAll({ where: { kddh: options.kddh } });
    let preJl = await IntegrationJl.findAll({ where: { kddh: options.kddh } });
    preJl = JSON.parse(JSON.stringify(preJl));
    preRecord = JSON.parse(JSON.stringify(preRecord));
    try {
      await IntegrationJl.destroy({ where: { kddh: options.kddh } });
      await IntegrationRecord.update({
        ...options,
      }, { where: { kddh: options.kddh }, fields });
      for (const item of dataList) {
        await IntegrationJl.create({
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
        await IntegrationRecord.update({
          ...o,
        }, { where: { kddh: options.kddh }, fields });
      }
      if (preJl.length > 0) {
        await IntegrationJl.destroy({ where: { kddh: options.kddh } });
        for (const item of preJl) {
          await IntegrationJl.create({
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
    const { IntegrationRecord, TransportJl } = ctx.model;
    const data = await IntegrationRecord.destroy({ where: { kddh: options.kddh } });
    for (const item of options.jlidArr) {
      await TransportJl.update({ state: 0 }, { where: { id: item }, fields: [ 'state' ] });
    }
    return data;
  }

};
