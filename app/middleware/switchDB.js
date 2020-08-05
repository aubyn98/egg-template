'use strict';
module.exports = () => {
  return async function(ctx, next) {
    //   const config = ctx.request.body;
    const config = {
      database: 'hy', username: 'sa', password: 'adminlysoft', host: '192.168.2.252', port: 1686,
    };
    ctx.$db = ctx.app.db.create(config);
    ctx.$db.$query = async (str, type = null) => {
      if (!type) {
        if (str.startsWith('select') || str.startsWith('SELECT')) {
          type = 'SELECT';
        } else if (str.startsWith('update') || str.startsWith('UPDATE')) {
          type = 'UPDATE';
        } else if (str.startsWith('insert') || str.startsWith('INSERT')) {
          type = 'INSERT';
        } else if (str.startsWith('delete') || str.startsWith('DELETE')) {
          type = 'DELETE';
        }
      }
      const data = await ctx.$db.query(str, { type });
      return data;
    };
    await next();
  };
};
