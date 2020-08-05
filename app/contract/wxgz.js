'use strict';
module.exports = {
  wxgzResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          wxgz: 'kg',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },

  wxgzAddRequest: {
    wxgz: { type: 'string', description: '单位', required: true, example: 'kg' },
  },
  wxgzAddResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          wxgz: 'kg',
        },
      ],
    },
  },

  wxgzUpdateRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
    wxgz: { type: 'string', description: '单位', required: true, example: 'kg' },
  },
  wxgzUpdateResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },

  wxgzDeleteRequest: {
    id: { type: 'number', description: 'id', required: true, example: '11' },
  },
  wxgzDeleteResponse: {
    status: {
      type: 'number',
      example: 1,
    },
  },
};
