'use strict';
const Service = require('egg').Service;
module.exports = class Goods extends Service {
  async search(options) {
    const { ctx } = this;
    const { goods, i } = options;
    let result,
      total;
    if (i) {
      result = await ctx.$query(`select * from (select row_number() over(order by id) as rownumber,* from goods) temp_row where rownumber <= ${i * 20} and rownumber>=${(i - 1) * 20 + 1} and goods like '%${goods}%'`);
      total = await ctx.$query(`select count(*) as total from goods where goods like '%${goods}%'`);
    } else {
      result = await ctx.$query('select * from goods');
      total = await ctx.$query('select count(*) as total from goods');
    }
    return {
      result,
      total,
    };
  }
  async add(options) {
    const result = await this.ctx.$query(`insert into goods(goods,unit,price,remark) output inserted.* values('${options.goods}','${options.unit}',${options.price || '0'},'${options.remark}')`);
    return result;
  }
  async update(options) {
    const result = await this.ctx.$query(`update goods set goods = '${options.goods}',unit = '${options.unit}',price=${options.price},remark='${options.remark}' where id=${options.id}`);
    return result;
  }
  async delete(options) {
    const result = await this.ctx.$query(`delete from goods where id=${options.id}`);
    return result;
  }

};
