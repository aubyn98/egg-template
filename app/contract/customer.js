'use strict';
module.exports = {
  customerResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          customerName: 'A',
          simpleCode: 'A',
          liaison: 'B',
          telephone: '0663-54488',
          phone: '13128386917',
          fax: '',
          freight: '香港',
          address: '香港',
          remark: 'XXX货运站',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },

  customerAddRequest: {
    customerName: { type: 'string', description: '客户名 必填', required: true, example: 'A' },
    simpleCode: { type: 'string', description: '简码 必填', required: true, example: 'A' },
    liaison: { type: 'string', description: '联系人', required: false, example: 'B' },
    telephone: { type: 'string', description: '电话', required: false, example: '0663-54488' },
    phone: { type: 'string', description: '联系人', required: false, example: '13128386917' },
    fax: { type: 'string', description: '传真', required: false, example: '' },
    freight: { type: 'string', description: '运到', required: false, example: '香港' },
    address: { type: 'string', description: '地址 必填', required: true, example: '香港' },
    remark: { type: 'string', description: '备注', required: false, example: 'XXX货运站' },
  },
  customerAddResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          customerName: 'A',
          simpleCode: 'A',
          liaison: 'B',
          telephone: '0663-54488',
          phone: '13128386917',
          fax: '',
          freight: '香港',
          address: '香港',
          remark: 'XXX货运站',
        },
      ],
    },
  },

  customerUpdateRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
    customerName: { type: 'string', description: '客户名 必填', required: true, example: 'A' },
    simpleCode: { type: 'string', description: '简码 必填', required: true, example: 'A' },
    liaison: { type: 'string', description: '联系人', required: false, example: 'B' },
    telephone: { type: 'string', description: '电话', required: false, example: '0663-54488' },
    phone: { type: 'string', description: '联系人', required: false, example: '13128386917' },
    fax: { type: 'string', description: '传真', required: false, example: '' },
    freight: { type: 'string', description: '运到', required: false, example: '香港' },
    address: { type: 'string', description: '地址 必填', required: true, example: '香港' },
    remark: { type: 'string', description: '备注', required: false, example: 'XXX货运站' },
  },
  customerUpdateResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },

  customerDeleteRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
  },
  customerDeleteResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },
};
