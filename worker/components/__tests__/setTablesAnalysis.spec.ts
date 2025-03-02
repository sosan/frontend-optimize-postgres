import { generateDDLTable, generateDMLTable, setTablesAnalysis } from '../responseResult';
import { Analysis } from "../../src/models/models";
const ddllysis: Analysis = {
  ddl: [
    [
      {
        name: "many-not-null-unique",
        description: "Relation has more than one unique indexes fully based on non-nullable columns",
        location: 21,
        position: {
          line: 2,
          column: 1
        },
        relation: {
          num: 0
        }
      },
      {
        name: "unlimited-varchar-or-text-column",
        description: "TODO",
        location: 53,
        position: {
          line: 3,
          column: 12
        },
        relation: {
          num: 0
        }
      },
      {
        name: "TODO",
        description: "TODO",
        location: 53,
        position: {
          line: 3,
          column: 12
        },
        relation: {
          num: 0
        }
      }
    ]
  ],
  dml: [],
  config: [
    {
      "b-tree-index-on-text": "warning"
    },
    {
      "ddl-date-name-type-inconsistency": "notice"
    },
    {
      "ddl-reserved-names": "notice"
    },
    {
      "many-not-null-unique": "warning"
    },
    {
      "name-shadows-function": "warning"
    },
    {
      "name-shadows-type": "warning"
    },
    {
      "text-instead-varchar": "notice"
    },
    {
      "unique-constraint": "warning"
    },
    {
      "unlimited-varchar-or-text-column": "warning"
    }
  ],
  statistics: {
    ddl: {
      kind: {
        architect: 52,
        error: 0,
        naming: 4,
        performance: 53,
        security: 2
      },
      total: 83
    },
    dml: {
      kind: {
        architect: 67,
        error: 0,
        naming: 0,
        performance: 37,
        security: 4
      },
      total: 77
    },
    common: {
      kind: {
        architect: 16,
        error: 0,
        naming: 0,
        performance: 0,
        security: 1
      },
      total: 20
    }
  }
};

const dmllysis: Analysis = {
  ddl: [],
  dml: [
    {
      "name": "select-asterisk",
      "description": "Avoid SELECT * or SELECT t.*, list all columns instead",
      "location": 7,
      "position": {
        "line": 1,
        "column": 8
      }
    },
    {
      "name": "select-naked",
      "description": "SELECT ... FROM without WHERE/LIMIT/GROUP BY",
      "location": 0,
      "position": {
        "line": 1,
        "column": 1
      }
    },
    {
      "name": "select-without-order-by",
      "description": "If sorting is not chosen, the rows will be returned in an unspecified order.",
      "location": 0,
      "position": {
        "line": 1,
        "column": 1
      }
    },
    {
      "name": "no-limit",
      "description": "Recommend to use LIMIT for decrease network interactions for multi-lines result SELECT statements.",
      "location": 0,
      "position": {
        "line": 1,
        "column": 1
      }
    }
  ],
  config: [
    {
      "no-limit": "notice"
    },
    {
      "select-asterisk": "warning"
    },
    {
      "select-naked": "warning"
    },
    {
      "select-without-order-by": "notice"
    }
  ],
  statistics: {
    ddl: {
      kind: {
        architect: 0,
        error: 0,
        naming: 0,
        performance: 0,
        security: 0
      },
      total: 0
    },
    dml: {
      kind: {
        architect: 0,
        error: 0,
        naming: 0,
        performance: 0,
        security: 0
      },
      total: 0
    },
    common: {
      kind: {
        architect: 0,
        error: 0,
        naming: 0,
        performance: 0,
        security: 0
      },
      total: 0
    }
  }
};

describe('setTablesAnalysis', () => {
  test("test only ddL", async () => {
    const expectedOutput = [
      {
        key: "0-ddl",
        name: "many-not-null-unique",
        position: "Position Line 2 Column 1",
        description: "Relation has more than one unique indexes fully based on non-nullable columns",
        tags: ["warning"]
      },
      {
        key: "1-ddl",
        name: "unlimited-varchar-or-text-column",
        position: "Position Line 3 Column 12",
        description: "unlimited-varchar-or-text-column",
        tags: ["warning"]
      },
      {
        key: "2-ddl",
        name: "TODO",
        position: "Position Line 3 Column 12",
        description: "TODO",
        tags: ["notice"]
      }

    ];

    const result = await generateDDLTable(ddllysis);
    expect(result).toEqual(expectedOutput);
  });

  test("test only dml", async () => {
    const expectedOutput = [
      {
        "description": "Avoid SELECT * or SELECT t.*, list all columns instead",
        "key": "0-dml",
        "name": "select-asterisk",
        "position": "Position Line 1 Column 8",
        "tags": [
          "warning",
        ],
      },
      {
        "description": "SELECT ... FROM without WHERE/LIMIT/GROUP BY",
        "key": "1-dml",
        "name": "select-naked",
        "position": "Position Line 1 Column 1",
        "tags": [
          "warning",
        ],
      },
      {
        "description": "If sorting is not chosen, the rows will be returned in an unspecified order.",
        "key": "2-dml",
        "name": "select-without-order-by",
        "position": "Position Line 1 Column 1",
        "tags": [
          "notice",
        ],
      },
      {
        "description": "Recommend to use LIMIT for decrease network interactions for multi-lines result SELECT statements.",
        "key": "3-dml",
        "name": "no-limit",
        "position": "Position Line 1 Column 1",
        "tags": [
          "notice",
        ],
      },

    ];

    const result = await generateDMLTable(dmllysis);
    expect(result).toEqual(expectedOutput);
  });

  test('should return the correct ColumnDataType objects', async () => {

    const expectedOutput = [
      {
        key: "0-ddl",
        name: "many-not-null-unique",
        position: "Position Line 2 Column 1",
        description: "Relation has more than one unique indexes fully based on non-nullable columns",
        tags: ["warning"]
      },
      {
        key: "1-ddl",
        name: "unlimited-varchar-or-text-column",
        position: "Position Line 3 Column 12",
        description: "unlimited-varchar-or-text-column",
        tags: ["warning"]
      },
      {
        key: "2-ddl",
        name: "TODO",
        position: "Position Line 3 Column 12",
        description: "TODO",
        tags: ["notice"]
      },
      {
        "description": "Avoid SELECT * or SELECT t.*, list all columns instead",
        "key": "0-dml",
        "name": "select-asterisk",
        "position": "Position Line 1 Column 8",
        "tags": [
          "warning",
        ],
      },
      {
        "description": "SELECT ... FROM without WHERE/LIMIT/GROUP BY",
        "key": "1-dml",
        "name": "select-naked",
        "position": "Position Line 1 Column 1",
        "tags": [
          "warning",
        ],
      },
      {
        "description": "If sorting is not chosen, the rows will be returned in an unspecified order.",
        "key": "2-dml",
        "name": "select-without-order-by",
        "position": "Position Line 1 Column 1",
        "tags": [
          "notice",
        ],
      },
      {
        "description": "Recommend to use LIMIT for decrease network interactions for multi-lines result SELECT statements.",
        "key": "3-dml",
        "name": "no-limit",
        "position": "Position Line 1 Column 1",
        "tags": [
          "notice",
        ],
      },

    ];

    const result = await setTablesAnalysis(ddllysis, dmllysis);
    expect(result).toEqual(expectedOutput);
  });

  test('should handle empty ddllysis', async () => {
    const ddllysis = {
      ddl: [],
      dml: [],
      config: [],
      statistics: {
        ddl: {
          kind: {
            architect: 0,
            error: 0,
            naming: 0,
            performance: 0,
            security: 0
          },
          total: 0
        },
        dml: {
          kind: {
            architect: 0,
            error: 0,
            naming: 0,
            performance: 0,
            security: 0
          },
          total: 0
        },
        common: {
          kind: {
            architect: 0,
            error: 0,
            naming: 0,
            performance: 0,
            security: 0
          },
          total: 0
        }
      }
    };

    const dmllysis = {
      ddl: [],
      dml: [],
      config: [],
      statistics: {
        ddl: {
          kind: {
            architect: 0,
            error: 0,
            naming: 0,
            performance: 0,
            security: 0
          },
          total: 0
        },
        dml: {
          kind: {
            architect: 0,
            error: 0,
            naming: 0,
            performance: 0,
            security: 0
          },
          total: 0
        },
        common: {
          kind: {
            architect: 0,
            error: 0,
            naming: 0,
            performance: 0,
            security: 0
          },
          total: 0
        }
      }
    };

    const expectedOutput = [] as any;

    const result = await setTablesAnalysis(ddllysis, dmllysis);
    expect(result).toEqual(expectedOutput);
  });
});
