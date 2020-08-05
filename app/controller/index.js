'use strict';
const Controller = require('egg').Controller;
const wechat = require('co-wechat');
class UserController extends Controller {
  async index() {
    this.ctx.unsafeRedirect('./index.html');
  }
  async wechat() {
    const { ctx, config } = this;
    await wechat(config.wxconf).middleware(async message => {
      const data = await ctx.$query(
        `select * from logistics where bm = '${message.Content}'`
      );
      const msg = [];
      data.forEach(item => {
        msg.push(item.time.toJSON().replace('T', ' ').substring(0, 19) + ' 到达 ' + item.position);
      });
      if (data.length < 1) {
        return `暂无${message.Content}单号的货运信息`;
      }
      return `${''.padStart(12, '-')}货运信息${''.padStart(12, '-')}
  
${msg.join('\r\n\r\n')}
  
${''.padStart(14, '-')}end${''.padStart(16, '-')}`;
    })(ctx);
  }
}
module.exports = UserController;
