'use strict';
module.exports = {
  unitResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          unit: 'kg',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },

  unitAddRequest: {
    unit: { type: 'string', description: '单位', required: true, example: 'kg' },
  },
  unitAddResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          unit: 'kg',
        },
      ],
    },
  },

  unitUpdateRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
    unit: { type: 'string', description: '单位', required: true, example: 'kg' },
  },
  unitUpdateResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },

  unitDeleteRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
  },
  unitDeleteResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },
};
