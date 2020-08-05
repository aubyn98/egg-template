'use strict';
const Service = require('egg').Service;
const fields = [ 'dh', 'date', 'lsh', 'creator', 'startStation', 'endStation', 'consignee', 'consigneePhone', 'consigneeAddress', 'customerName', 'customerPhone',
  'customerAddress', 'remark', 'imaginaryPiece', 'imaginaryPercent', 'payment', 'insured', 'insuredSum', 'insuredRatio', 'collection', 'sum', 'position' ];
const fields2 = [ 'dh', 'goods', 'unit', 'num', 'quantity', 'unfigure', 'price', 'money', 'discount', 'transferFee', 'deliveryFee', 'otherPrice', 'state', 'remark', 'id2' ];
module.exports = class TransportRecord extends Service {

  async index(options) {
    const { ctx, app } = this;
    const { TransportRecord, TransportJl } = ctx.model;
    const { Op } = app.Sequelize;
    // 解构参数
    let { startDate, endDate, startStation, endStation, customerName, consignee, payment, state, goods, i, pageSize } = options;
    pageSize || (pageSize = 20);

    // 查询条件
    const where = {
      customerName: { [Op.like]: customerName ? `%${customerName}%` : '%%' },
      consignee: { [Op.like]: consignee ? `%${consignee}%` : '%%' },
      payment: { [Op.like]: payment ? `%${payment}%` : '%%' },
    };
    if (startDate && endDate) {
      where.date = { [Op.between]: [ startDate, endDate ] };
    }
    if (startStation && startStation.length > 0) {
      where.startStation = { [Op.in]: startStation };
    }
    if (endStation && endStation.length > 0) {
      where.endStation = { [Op.in]: endStation };
    }
    if (goods) {
      let goodsCondition = await TransportJl.findAll({ where: { goods, state: { [Op.like]: state ? `%${state}%` : '%%' } }, attributes: [ 'dh' ] });
      if (goodsCondition.length > 0) {
        goodsCondition = JSON.parse(JSON.stringify(goodsCondition));
        goodsCondition = goodsCondition.map(item => item.dh);
        goodsCondition = Array.from(new Set(goodsCondition));
      }
      where.dh = { [Op.in]: goodsCondition };
    }

    // 判断是否分页
    const page = i ? { offset: (i - 1) * pageSize, limit: pageSize } : {};

    // 获取查询的运单
    let data = await TransportRecord.findAll({ where, ...page });
    data = JSON.parse(JSON.stringify(data));
    // 获取条件查询的运单总数
    let count = await TransportRecord.findAll({ where, attributes: [[ ctx.model.fn('COUNT', ctx.model.col('*')), 'count' ]] });
    if (count.length > 0) {
      count = count[0].dataValues.count;
    } else { count = 0; }

    // 获取运单的记录信息
    for (const item of data) {
      item.dataList = await TransportJl.findAll({ where: { id2: item.id } });
    }

    return {
      count,
      data,
    };
  }

  async findById(options) {
    const { ctx } = this;
    const { TransportRecord, TransportJl } = ctx.model;
    const { id } = options;
    let data = await TransportRecord.findAll({ where: { id } });
    if (data.length > 0) {
      data = JSON.parse(JSON.stringify(data))[0];
      data.dataList = await TransportJl.findAll({ where: { id2: id } });
      return {
        data,
        status: 1,
      };
    }
    return {
      status: 0,
    };

  }

  async join(options) {
    const { ctx } = this;
    let { startDate, endDate, startStation, endStation, customerName, consignee, payment, state, goods, i, pageSize } = options;
    pageSize || (pageSize = 20);
    let where = 'where ';
    if (startDate && endDate) {
      where += `a.date between '${startDate}' and '${endDate}' `;
    }
    if (startStation && startStation.length > 0) {
      where += `and a.startStation in ('${startStation.join('\',\'')}') `;
    }
    if (endStation && endStation.length > 0) {
      where += `and a.endStation in ('${endStation.join('\',\'')}') `;
    }
    if (customerName) {
      where += `and a.customerName like '%${customerName}%' `;
    }
    if (consignee) {
      where += `and a.consignee like '%${consignee}%' `;
    }
    if (payment) {
      where += `and a.payment like '%${payment}%' `;
    }
    if (state) {
      where += `and b.state = ${state} `;
    }
    if (goods) {
      where += `and b.goods like '%${goods}%' `;
    }
    const sort = ' order by dh,date desc';
    let sql = `select a.id,b.id as jlid,a.dh,a.date,a.startStation,a.endStation,a.customerName,a.customerAddress,a.consignee,a.consigneeAddress,
    a.payment,b.goods,b.num,b.quantity,a.collection,b.unit,b.price,b.money,a.insured,a.insuredSum,a.insuredRatio,
    b.otherPrice,b.discount,b.transferFee,b.deliveryFee,a.[sum], b.state,b.remark
    from transportRecord as a right join transport_jl as b on a.id = b.id2 `;
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

  async add(options) {
    const { ctx } = this;
    const { TransportRecord, TransportJl, Customer, Consignee, Goods, Unit, StartStation, EndStation, Lsh } = ctx.model;

    // record 将要插入的信息容器
    const record = {};
    // record 将要插入的记录容器
    let dataList = [];

    // 根据参数 排除 记录信息 和 流水号
    Object.keys(options).forEach(key => {
      if (key !== 'dataList' && key !== 'lsh') {
        record[key] = options[key];
      } else {
        if (typeof options.dataList === 'object') { dataList = options.dataList; } else {
          dataList = options.dataList && JSON.parse(options.dataList);
        }
      }
    });
    let lsh = await Lsh.findAll({ fields: [ 'lsh' ] });
    lsh = JSON.parse(JSON.stringify(lsh))[0].lsh;
    lsh += 1;
    await Lsh.update({ lsh }, { where: { id: 1 }, fields: [ 'lsh' ] });
    // 查找信息中的托运人  若档案无此人信息则 创建 并累加流水号
    let customerData = await Customer.findCreateFind({ where: { customerName: options.customerName }, defaults: { customerName: options.customerName, simpleCode: ctx.app.str.py.getCamelChars(options.customerName), address: options.customerAddress, telephone: options.customerPhone, lsh: 0 } });
    customerData = JSON.parse(JSON.stringify(customerData));
    customerData[0].lsh += 1;

    // 查找信息中的收货人  若档案无此人信息则 创建
    await Consignee.findCreateFind({ where: { consignee: options.consignee }, defaults: { consignee: options.consignee, simpleCode: ctx.app.str.py.getCamelChars(options.consignee), goodsType: '', price: 0, insured: 0, payment: '', discount: 0, address: options.consigneeAddress, telephone: options.consigneePhone } });

    // 更新档案的流水号
    await Customer.update({
      ...customerData[0],
    }, { where: { id: customerData[0].id } });

    // 创建运单信息
    const res = await TransportRecord.create({
      ...record,
      lsh,
    }, { fields });

    // 查找始发站和到货站档案  是否存在
    StartStation.findCreateFind({ where: { startStation: options.startStation }, defaults: { startStation: options.startStation } });
    EndStation.findCreateFind({ where: { endStation: options.endStation }, defaults: { endStation: options.endStation } });

    try {
      // 尝试插入记录
      for (const item of dataList) {
        await TransportJl.create({
          ...item,
          dh: record.dh,
          id2: JSON.parse(JSON.stringify(res)).id,
        }, { fields2 });
        // 查看货物和单位档案是否有记录  如果没有则创建
        Goods.findCreateFind({ where: { goods: item.goods }, defaults: { goods: item.goods, unit: item.unit, price: item.price, remark: '' } });
        Unit.findCreateFind({ where: { unit: item.unit }, defaults: { unit: item.unit } });
      }
      return {
        status: 1,
        msg: '保存成功！',
        res,
      };
    } catch (e) {
      // 失败则删除 刚刚创建的运单
      await TransportRecord.destroy({ where: { dh: options.dh } });
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
    const { TransportRecord, TransportJl, Customer, Consignee, Goods, Unit, StartStation, EndStation } = ctx.model;

    // record 将要更新的信息容器
    const record = {};
    // record 将要更新的记录容器
    let dataList = [];
    Object.keys(options).forEach(key => {
      if (key !== 'dataList') {
        record[key] = options[key];
      } else if (key === 'dataList') {
        if (typeof options.dataList === 'object') { dataList = options.dataList; } else {
          dataList = options.dataList && JSON.parse(options.dataList);
        }
      }
    });

    // 查找存储保存前的 运单信息
    let preRecord = await TransportRecord.findAll({ where: { id: options.id } });
    preRecord = JSON.parse(JSON.stringify(preRecord));
    let preJl = await TransportJl.findAll({ where: { dh: preRecord[0].dh } });
    preJl = JSON.parse(JSON.stringify(preJl));

    if (preRecord[0].state === 1) {
      return {
        status: 0,
        msg: '保存失败，该单已被引用或结单！',
      };
    }

    // 查找这次修改的信息中 客户是否一致  不一致则更改流水号
    let customerData;
    if (preRecord[0].customerName !== options.customerName) {
      customerData = await Customer.findCreateFind({ where: { customerName: options.customerName }, defaults: { customerName: options.customerName, simpleCode: ctx.app.str.py.getCamelChars(options.customerName), address: '', lsh: 0 } });
      customerData = JSON.parse(JSON.stringify(customerData));
      customerData[0].lsh += 1;
      await Customer.update({
        ...customerData[0],
      }, { where: { id: customerData[0].id } });
    }


    try {
      // 尝试更新数据
      await TransportJl.destroy({ where: { dh: preRecord[0].dh } });
      await TransportRecord.update({
        ...options,
        lsh: customerData && customerData[0].lsh,
      }, { where: { dh: preRecord[0].dh }, fields });
      // 查找始发站和到货站档案  是否存在
      StartStation.findCreateFind({ where: { startStation: options.startStation }, defaults: { startStation: options.startStation } });
      EndStation.findCreateFind({ where: { endStation: options.endStation }, defaults: { endStation: options.endStation } });

      for (const item of dataList) {
        await TransportJl.create({
          ...item,
          dh: options.dh,
          id2: options.id,
        }, { fields2 });
        // 查看货物和单位档案是否有记录  如果没有则创建
        Goods.findCreateFind({ where: { goods: item.goods }, defaults: { goods: item.goods, unit: item.unit, price: item.price, remark: '' } });
        Unit.findCreateFind({ where: { unit: item.unit }, defaults: { unit: item.unit } });
      }
      // 查找信息中的收货人  若档案无此人信息则 创建
      await Consignee.findCreateFind({ where: { consignee: options.consignee }, defaults: { consignee: options.consignee, simpleCode: ctx.app.str.py.getCamelChars(options.consignee), goodsType: '', price: 0, insured: 0, payment: '', discount: 0, address: options.consigneeAddress, telephone: options.consigneePhone } });
      return {
        status: 1,
        lsh: customerData && customerData[0].lsh,
        msg: '保存成功',
      };
    } catch (e) {
      // 更新失败 恢复之前的状态
      if (preRecord.length > 0) {
        const o = {};
        Object.keys(preRecord[0]).forEach(key => {
          if (key !== 'id') {
            o[key] = preRecord[0][key];
          }
        });
        await TransportRecord.update({
          ...o,
        }, { where: { dh: preRecord[0].dh }, fields });
      }
      if (preJl.length > 0) {
        await TransportJl.destroy({ where: { dh: preRecord[0].dh } });
        for (const item of preJl) {
          await TransportJl.create({
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
    const { TransportRecord } = ctx.model;
    const data = await TransportRecord.destroy({ where: { id: options.id } });
    return data;
  }

};
