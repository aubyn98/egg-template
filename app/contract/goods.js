'use strict';

module.exports = {
  goodsResponse: {
    status: { type: 'number', example: 1 },
    res: {
      type: 'string',
      example: [{
        goods: '汽车配件',
        unit: 'KG',
        price: '0',
        remark: '',
        id: 1,
      },
      ],
    },
    total: { type: 'number', example: 1 },
  },
  goodsAddRequest: {
    goods: { type: 'string', required: true, example: '汽车配件' },
    unit: { type: 'string', required: true, example: 'KG' },
    price: { type: 'number', required: true, example: 0 },
    remark: { type: 'string', required: true, example: '' },
  },
  goodsAddResponse: {
    status: { type: 'number', example: 1 },
    res: { type: 'string', example: [{
      id: 1,
      goods: '汽车配件',
      unit: 'KG',
      price: 1,
      reamrk: '我是添加货物',
    }] },
  },
  goodsUpdateRequest: {
    id: { type: 'string', required: true, example: '1' },
    goods: { type: 'string', required: true, example: '汽车配件' },
    unit: { type: 'string', required: true, example: 'KG' },
    price: { type: 'number', required: true, example: 0 },
    remark: { type: 'string', required: true, example: '' },
  },
  goodsUpdateResponse: {
    status: { type: 'number', example: 1 },
  },
  goodsDeleteRequest: {
    id: { type: 'string', required: true, example: '1' },
  },
  goodsDeleteResponse: {
    status: { type: 'number', required: true, example: 1 },
  },
};
