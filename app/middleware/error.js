'use strict';
module.exports = () => {
  return async function error(ctx, next) {
    try {
      await next();
    } catch (e) {
      ctx.app.logger.error(e);
      ctx.body = {
        status: 0,
        msg: '请检查是否有重复填入已存在的唯一信息',
        error: e,
      };
    }
  };
};
