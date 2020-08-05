'use strict';
const Service = require('egg').Service;
module.exports = class Print extends Service {

  async contract(id) {
    const { ctx } = this;
    const fields = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'transportRecord')`);
    const data = await ctx.$query(`select [id], [dh], [date], [lsh], [creator], [startStation], [endStation], [consignee], [consigneePhone], [consigneeAddress],
    [customerName], [customerPhone], [customerAddress], [remark], [imaginaryPiece], [imaginaryPercent], [payment], [insured], [insuredSum], [insuredRatio], [collection], [sum], [position] FROM [transportRecord] AS [transportRecord] 
    WHERE [transportRecord].[id] = N'${id}'`);

    const fields2 = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'transport_jl')`);
    const data2 = await ctx.$query(`select [id], [dh], [goods], [unit], [num], [quantity], [unfigure], [price], [money], [discount], [transferFee], [deliveryFee],
    [otherPrice], [remark], [state], [id2] FROM [transport_jl] AS [transport_jl] WHERE [transport_jl].[id2] = N'${id}'`);

    return {
      table: 'transportRecord',
      fields,
      data,
      table2: 'transport_jl',
      fields2,
      data2,
    };
  }

  async base() {
    const { ctx } = this;
    const fields = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'baseMsg')`);
    const data = await ctx.$query('select * FROM baseMsg');
    return {
      table: 'baseMsg',
      fields,
      data,
    };
  }

  async integration(kddh) {
    const { ctx } = this;
    const fields = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'integrationRecord')`);
    const data = await ctx.$query(`select * FROM [integrationRecord] AS [integrationRecord] WHERE [integrationRecord].[kddh] = N'${kddh}'`);

    const fields2 = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'integration_jl')`);
    const data2 = await ctx.$query(`select * FROM [integration_jl] AS [integration_jl] WHERE [integration_jl].[kddh] = N'${kddh}'`);


    return {
      table: 'integrationRecord',
      fields,
      data,
      table2: 'integration_jl',
      fields2,
      data2,
    };

  }
  async inventory(kddh) {
    const { ctx } = this;
    const fields = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'inventoryRecord')`);
    const data = await ctx.$query(`select * FROM [inventoryRecord] AS [inventoryRecord] WHERE [inventoryRecord].[kddh] = N'${kddh}'`);

    const fields2 = await ctx.$query(`select name AS column_name,TYPE_NAME(system_type_id) AS column_type,max_length,is_nullable,column_id FROM sys.columns
    WHERE object_id=OBJECT_ID(N'inventory_jl')`);
    const data2 = await ctx.$query(`select * FROM [inventory_jl] AS [inventory_jl] WHERE [inventory_jl].[kddh] = N'${kddh}'`);


    return {
      table: 'inventoryRecord',
      fields,
      data,
      table2: 'inventory_jl',
      fields2,
      data2,
      table3: 'baseMsg',
    };
  }

};
