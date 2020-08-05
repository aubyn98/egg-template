'use strict';
const Service = require('egg').Service;
module.exports = class Base extends Service {

  async index() {
    const { ctx } = this;
    const data = await ctx.$query('select * from baseMsg');
    return {
      data,
    };
  }
  async update(options) {
    const { ctx } = this;
    const { corporateName, englishName, contacts, phone, mobilePhone, fax, website, mailbox, address, tip } = options;
    const data = await ctx.$query(`update baseMsg set corporateName='${corporateName}',englishName='${englishName}',
    contacts='${contacts}',phone='${phone}',mobilePhone='${mobilePhone}',fax='${fax}',
    website='${website}',mailbox='${mailbox}',address='${address}',tip='${tip}'`);
    return data;
  }

};
