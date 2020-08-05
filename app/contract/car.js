'use strict';
module.exports = {
  carResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          carType: '东风牌',
          carNumber: '赣G88899',
          register: '鄂J0506挂',
          company: '九江市隆发汽车运输服务有限公司',
          driver: '郭亮',
          license: '421127198110214714',
          phone: '13972742818',
          remark: '发动机号7879137',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },

  carAddRequest: {
    carType: { type: 'string', description: '车种', required: false, example: '东风牌' },
    carNumber: { type: 'string', description: '车号', required: false, example: '赣G88899' },
    register: { type: 'string', description: '挂号', required: false, example: '鄂J0506挂' },
    company: { type: 'string', description: '车属单位', required: false, example: '九江市隆发汽车运输服务有限公司' },
    driver: { type: 'string', description: '司机', required: false, example: '郭亮' },
    license: { type: 'string', description: '驾驶证号', required: false, example: '421127198110214714' },
    phone: { type: 'string', description: '手机号', required: false, example: '13972742818' },
    remark: { type: 'string', description: '备注', required: false, example: '发动机号7879137' },
  },
  carAddResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          carType: '东风牌',
          carNumber: '赣G88899',
          register: '鄂J0506挂',
          company: '九江市隆发汽车运输服务有限公司',
          driver: '郭亮',
          license: '421127198110214714',
          phone: '13972742818',
          remark: '发动机号7879137',
        },
      ],
    },
  },

  carUpdateRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
    carType: { type: 'string', description: '车种', required: false, example: '东风牌' },
    carNumber: { type: 'string', description: '车号', required: false, example: '赣G88899' },
    register: { type: 'string', description: '挂号', required: false, example: '鄂J0506挂' },
    company: { type: 'string', description: '车属单位', required: false, example: '九江市隆发汽车运输服务有限公司' },
    driver: { type: 'string', description: '司机', required: false, example: '郭亮' },
    license: { type: 'string', description: '驾驶证号', required: false, example: '421127198110214714' },
    phone: { type: 'string', description: '手机号', required: false, example: '13972742818' },
    remark: { type: 'string', description: '备注', required: false, example: '发动机号7879137' },
  },
  carUpdateResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },

  carDeleteRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
  },
  carDeleteResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },
};
