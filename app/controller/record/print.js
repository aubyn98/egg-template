'use strict';
const path = require('path');
const fs = require('fs');
const Controller = require('egg').Controller;

class PrintController extends Controller {
  /**
    * @Controller 打印管理
   */

  /**
   *  @summary 获取合同打印信息
   *  @description 获取数据 返回数据文件下载地址
   *  @router get /print/contract
  */
  async contract() {
    const { ctx, app } = this;
    const reqData = ctx.request.query;
    const { id, method } = reqData;
    const print = new app.Printer(path.resolve(__dirname, '../../public/temp'), path.resolve(__dirname, '../../public/template/contract.fr3'), app.config.address);
    const { table, fields, data, table2, fields2, data2 } = await this.service.record.print.contract(id);
    print.SetPostUrl(app.config.address + '/print/templateChange?FileName=contract.fr3');
    const fieldsToVarchar = fields.map(item => {
      item.column_type = 'varchar';
      item.max_length = 50;
      return item;
    });
    let fields2ToVarchar = fields2.map(item => {
      item.column_type = 'varchar';
      item.max_length = 50;
      return item;
    });
    if (data2.length < 2 && data2.length === 1) {
      const tempObj = {};
      Object.keys(data2[0]).forEach(
        key => {
          tempObj[key] = '';
        }
      );
      data2.push(tempObj);
      data2[0].payment = data[0].payment;
    } else {
      fields2ToVarchar = fields2;
      data2[0].payment = data[0].payment;
      data2[1].payment = data[0].payment;
    }
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (item[key] === 0 && !key.includes('time')) {
          item[key] = '';
        }
      });
    });
    data2.forEach(item => {
      Object.keys(item).forEach(key => {
        if (item[key] === 0) {
          item[key] = '';
        }
      });
    });
    fields2ToVarchar.push({ column_name: 'payment',
      column_type: 'varchar',
      max_length: 50,
      is_nullable: false,
      column_id: 17 });
    const fileUrl = print.Report(method, [ table, fieldsToVarchar, data ], [ table2, fields2ToVarchar, data2 ]);
    ctx.body = {
      status: 1,
      url: fileUrl,
    };
  }
  /**
   *  @summary 获取小票
   *  @description 获取数据 返回数据文件下载地址
   *  @router get /print/ticket
  */
  async ticket() {
    const { ctx, app } = this;
    const reqData = ctx.request.query;
    const { id, method } = reqData;
    const print = new app.Printer(path.resolve(__dirname, '../../public/temp'), path.resolve(__dirname, '../../public/template/ticket.fr3'), app.config.address);
    const { table, fields, data, table2, fields2, data2 } = await this.service.record.print.contract(id);
    const { table: table3, fields: fields3, data: data3 } = await this.service.record.print.base();
    print.SetPostUrl(app.config.address + '/print/templateChange?FileName=ticket.fr3');
    const fileUrl = print.Report(method, [ table, fields, data ], [ table2, fields2, data2 ], [ table3, fields3, data3 ]);
    ctx.body = {
      status: 1,
      url: fileUrl,
    };
  }

  /**
   *  @summary 获取不干胶
   *  @description 获取数据 返回数据文件下载地址
   *  @router get /print/qrcode
  */
  async qrcode() {
    const { ctx, app } = this;
    const reqData = ctx.request.query;
    const { id, method } = reqData;
    const print = new app.Printer(path.resolve(__dirname, '../../public/temp'), path.resolve(__dirname, '../../public/template/qrcode.fr3'), app.config.address);
    const { table, fields, data, table2, fields2, data2 } = await this.service.record.print.contract(id);
    const { table: table3, fields: fields3, data: data3 } = await this.service.record.print.base();
    print.SetPostUrl(app.config.address + '/print/templateChange?FileName=qrcode.fr3');
    const arr = [];
    data2.forEach(item => {
      const num = item.num;
      for (let i = 0; i < num; i++) {
        item.index = `${item.goods}—${num}—${(i + 1)}`;
        arr.push({ ...item });
      }
    });
    fields2.push({ column_name: 'index',
      column_type: 'varchar',
      max_length: 50,
      is_nullable: false,
      column_id: 17 });
    const fileUrl = print.Report(method, [ table, fields, data ], [ table2, fields2, arr ], [ table3, fields3, data3 ]);
    ctx.body = {
      status: 1,
      url: fileUrl,
    };
  }
  /**
   *  @summary 获取整合单打印信息
   *  @description 获取数据 返回数据文件下载地址
   *  @router get /print/integration
  */
  async integration() {
    const { ctx, app } = this;
    const reqData = ctx.request.query;
    const { kddh, method } = reqData;
    const print = new app.Printer(path.resolve(__dirname, '../../public/temp'), path.resolve(__dirname, '../../public/template/integration.fr3'), app.config.address);
    const { table, fields, data, table2, fields2, data2 } = await this.service.record.print.integration(kddh);
    const { table: table3, fields: fields3, data: data3 } = await this.service.record.print.base();
    print.SetPostUrl(app.config.address + '/print/templateChange?FileName=integration.fr3');
    const fileUrl = print.Report(method, [ table, fields, data ], [ table2, fields2, data2 ], [ table3, fields3, data3 ]);
    ctx.body = {
      status: 1,
      url: fileUrl,
    };
  }

  /**
   *  @summary 获取清单打印信息
   *  @description 获取数据 返回数据文件下载地址
   *  @router get /print/inventory
  */
  async inventory() {
    const { ctx, app } = this;
    const reqData = ctx.request.query;
    const { kddh, method } = reqData;
    const print = new app.Printer(path.resolve(__dirname, '../../public/temp'), path.resolve(__dirname, '../../public/template/inventory.fr3'), app.config.address);
    const { table, fields, data, table2, fields2, data2 } = await this.service.record.print.inventory(kddh);
    const { table: table3, fields: fields3, data: data3 } = await this.service.record.print.base();
    print.SetPostUrl(app.config.address + '/print/templateChange?FileName=inventory.fr3');
    const fileUrl = print.Report(method, [ table, fields, data ], [ table2, fields2, data2 ], [ table3, fields3, data3 ]);
    ctx.body = {
      status: 1,
      url: fileUrl,
    };
  }

  /**
   *  @summary 获取清单打印信息
   *  @description 获取数据 返回数据文件下载地址
   *  @router all /print/templateChange
  */
  async templateChange() {
    const { ctx, app } = this;
    const { FileName } = ctx.request.query;
    const { ReportFileValue } = ctx.request.body;
    const templateDirPath = path.resolve(__dirname, '../../public/template');
    const templateCopyDirPath = path.resolve(__dirname, '../../public/templatebackup');
    let timeTamp = new Date();
    timeTamp.setMinutes(timeTamp.getMinutes() - timeTamp.getTimezoneOffset());
    timeTamp = timeTamp.toJSON().split('-')
      .join('')
      .substring(0, 17)
      .split(':')
      .join('');
    await app.fsUtils.dirCopy(templateDirPath, templateCopyDirPath, 'template' + timeTamp);
    const writeStream = fs.createWriteStream(path.join(templateDirPath, FileName));
    writeStream.write(Buffer.from(ReportFileValue, 'hex'), 'utf-8');
    writeStream.end();
    writeStream.on('finish', () => {
    });
    ctx.body = 1;
  }
}

module.exports = PrintController;
