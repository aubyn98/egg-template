'use strict';
const Service = require('egg').Service;
const fields = [ 'title', 'content' ];
module.exports = class Wxgz extends Service {

  async index() {
    const { ctx } = this;
    const { Wxgz } = ctx.model;
    const data = await Wxgz.findAll();
    return {
      data,
    };
  }

  async add(options) {
    const { ctx } = this;
    const { Wxgz } = ctx.model;
    const data = await Wxgz.create({
      ...options,
    }, { fields });
    return data;
  }

  async update(options) {
    const { ctx } = this;
    const { Wxgz } = ctx.model;
    const data = await Wxgz.update({
      ...options,
    }, { where: { id: options.id }, fields });
    return data;
  }

  async delete(options) {
    const { ctx } = this;
    const { Wxgz } = ctx.model;
    const data = await Wxgz.destroy({ where: { id: options.id } });
    return data;
  }

};
