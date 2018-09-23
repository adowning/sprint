// "provider": "gps"
const deviceUpdateSchema = {
  title: 'device update schema',
  description: 'describes a device update',
  version: 0,
  type: 'object',
  properties: {
    deviceId: {
      type: 'string',
      primary: true
    },
    status: {
      type: 'number'
    },
    accuracy: {
      type: 'number'
    },
    clientTime: {
      type: 'string'
    },
    batt: {
      type: 'string'
    },
    provider: {
      type: 'string'
    },
    coords: {
      type: 'object',
      properties: {
        lat: {
          type: 'number'
        },
        lon: {
          type: 'number'
        }
      }
    },
    userList: {
      type: 'array',
      maxItems: 5,
      uniqueItems: true,
      item: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          employeeId: {
            type: 'string'
          }
        }
      }
    }
  },
  required: ['deviceId']
};

export default deviceUpdateSchema;