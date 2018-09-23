const deviceSchema = {
  title: 'device schema',
  description: 'describes a device',
  version: 0,
  type: 'object',
  properties: {
    deviceId: {
      type: 'string',
      primary: true
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

export default deviceSchema;