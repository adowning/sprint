const cellSchema = {
  title: "cell",
  description: "describes a spreadsheet cell",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true
    },
    cellContent: {
      type: "string"
    },
    row: {
      type: "number",
      index: true
    },
    column: {
      type: "string",
      index: true
    }
  },
  required: ["cellContent", "row", "column"],
  compoundIndexes: [
    ["row", "column"] // <- this will create a compound-index for these two fields
  ]
};

export default cellSchema;