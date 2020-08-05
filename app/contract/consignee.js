'use strict';
module.exports = {
  consigneeResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          consignee: 'A',
          simpleCode: 'A',
          goodsType: '服装',
          price: 0,
          insured: 0,
          payment: '月结',
          telephone: '0663-54488',
          phone: '13128386917',
          discount: 0,
          freight: 'XXX货运站',
          line: '宁波-北京',
          address: 'XXX货运站',
          remark: 'XXX货运站',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },

  consigneeAddRequest: {
    consignee: { type: 'string', description: '客户名 必填', required: true, example: 'A' },
    simpleCode: { type: 'string', description: '简码 必填', required: true, example: 'A' },
    goodsType: { type: 'string', description: '货物类型', required: false, example: '服装' },
    price: { type: 'number', description: '单价', required: false, example: 0 },
    insured: { type: 'number', description: '报价金', required: false, example: 0 },
    payment: { type: 'string', description: '付款方式', required: true, example: '月结' },
    telephone: { type: 'string', description: '电话', required: false, example: '0663-54488' },
    phone: { type: 'string', description: '手机', required: true, example: '13128386917' },
    discount: { type: 'number', description: '折扣', required: false, example: 0 },
    freight: { type: 'string', description: '运到', required: false, example: 'XXX货运站' },
    line: { type: 'string', description: '线路', required: false, example: '宁波-北京' },
    address: { type: 'string', description: '地址 必填', required: true, example: 'XXX货运站' },
    remark: { type: 'string', description: '备注', required: false, example: 'XXX货运站' },
  },
  consigneeAddResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          consignee: 'A',
          simpleCode: 'A',
          goodsType: '服装',
          price: 0,
          insured: 0,
          payment: '月结',
          telephone: '0663-54488',
          phone: '13128386917',
          discount: 0,
          freight: 'XXX货运站',
          line: '宁波-北京',
          address: 'XXX货运站',
          remark: 'XXX货运站',
        },
      ],
    },
  },

  consigneeUpdateRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
    consignee: { type: 'string', description: '客户名 必填', required: true, example: 'A' },
    simpleCode: { type: 'string', description: '简码 必填', required: true, example: 'A' },
    goodsType: { type: 'string', description: '货物类型', required: false, example: '服装' },
    price: { type: 'number', description: '单价', required: false, example: 0 },
    insured: { type: 'number', description: '报价金', required: false, example: 0 },
    payment: { type: 'string', description: '付款方式', required: true, example: '月结' },
    telephone: { type: 'string', description: '电话', required: false, example: '0663-54488' },
    phone: { type: 'string', description: '手机', required: true, example: '13128386917' },
    discount: { type: 'number', description: '折扣', required: false, example: 0 },
    freight: { type: 'string', description: '运到', required: false, example: 'XXX货运站' },
    line: { type: 'string', description: '线路', required: false, example: '宁波-北京' },
    address: { type: 'string', description: '地址 必填', required: true, example: 'XXX货运站' },
    remark: { type: 'string', description: '备注', required: false, example: 'XXX货运站' },
  },
  consigneeUpdateResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },

  consigneeDeleteRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
  },
  consigneeDeleteResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },
};
