'use strict';
module.exports = {
  userResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          userName: 'a',
          password: '123',
          position: '海南',
          auth: 'car,carEdit',
          remark: null,
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },
  changePwRequest: {
    userName: { type: 'string', description: '用户名', required: true, example: 'A' },
    password: { type: 'string', description: '密码', required: true, example: '123' },
    newPassword: { type: 'string', description: '密码', required: true, example: '123' },
  },
  changePwResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    msg: {
      type: 'number',
      example: '修改成功！',
    },
  },
  scanRequest: {
    position: { type: 'string', description: '用户名', required: true, example: '海南' },
    bm: { type: 'string', description: '密码', required: true, example: 'AS-123' },
  },
  scanResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    msg: {
      type: 'number',
      example: '扫码成功！',
    },
  },
  loginRequest: {
    userName: { type: 'string', description: '用户名', required: true, example: 'A' },
    password: { type: 'string', description: '密码', required: true, example: '123' },
  },
  loginResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    msg: {
      type: 'number',
      example: '登录成功！',
    },
  },
  userAddRequest: {
    userName: { type: 'string', description: '用户名 唯一', required: true, example: 'A' },
    password: { type: 'string', description: '密码', required: true, example: '123' },
    position: { type: 'string', description: '地点', required: true, example: '香港' },
    remark: { type: 'string', description: '备注', required: false, example: 'XXX货运站' },
    auth: { type: 'string', description: '权限', required: false, example: 'car,carEdit' },
  },
  userAddResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          userName: 'A',
          password: '123',
          position: '香港',
          remark: 'XXX货运站',
          auth: 'car,carEdit',
        },
      ],
    },
  },

  userUpdateRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
    userName: { type: 'string', description: '用户名 唯一', required: true, example: 'A' },
    password: { type: 'string', description: '密码', required: true, example: '123' },
    position: { type: 'string', description: '地点', required: true, example: '香港' },
    remark: { type: 'string', description: '备注', required: false, example: 'XXX货运站' },
    auth: { type: 'string', description: '权限', required: false, example: 'car,carEdit' },
  },
  userUpdateResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },

  userDeleteRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
  },
  userDeleteResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },
};
