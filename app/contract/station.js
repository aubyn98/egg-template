'use strict';
module.exports = {
  startStationResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          startStation: '武汉',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },
  endStationResponse: {
    status: {
      type: 'number',
      example: 1,
    },
    res: {
      type: 'string',
      example: [
        {
          id: 1,
          endStation: '武汉',
        },
      ],
    },
    total: {
      type: 'number',
      example: 3,
    },
  },

};
