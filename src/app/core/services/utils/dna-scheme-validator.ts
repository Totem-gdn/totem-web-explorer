import { DNAItemFilter } from "@app/core/models/interfaces/dna-item-filter.interface";
import Ajv, {JSONSchemaType, DefinedError} from "ajv";
import { DNAResponseCompose } from "./dna-response-composer";

export class DNASchemeValidator {
  ajv: any;
  schema: JSONSchemaType<DNAItemFilter>;
  validate: any;

  constructor() {
    this.ajv = new Ajv({
      keywords: [
        require("ajv-keywords/dist/definitions/uniqueItemProperties")(),
        require("ajv-keywords/dist/definitions/regexp")(),
      ]
    });

    this.schema = {
      type: "object",
      properties: {
        description: {
          type: "string"
        },
        id: {
          type: "string"
        },
        type: {
          type: "string"
        },
        gene: {
          type: "number"
        },
        length: {
          type: "number"
        },

        values: {
          type: "array",
          nullable: true,
          additionalProperties: false,
          uniqueItemProperties: ["value"],
          anyOf: [
            {
              type: "array",
              items: {
                type: "string"
              }
            },
            {
              type: "array",
              items: {
                type: "object",
                properties: {
                  key: {
                    type: "string"
                  },
                  value: {
                    anyOf: [
                      { type: "number" },
                      { type: "array",
                        items: {
                          type: "number"
                        }
                      },
                    ]
                  }
                },
                required: ["key", "value"],
              }
            }
          ]
        },

        start: {
          type: "number"
        }
      },
      oneOf: [
        {
          properties: {
            type: {
              anyOf: [
                {type: "string", regexp: {pattern: "map", flags: "i"}},
                {type: "string", regexp: {pattern: "range", flags: "i"}},
              ]
            },
            values: {
              type: "array",
              nullable: false,
              additionalProperties: false,
              uniqueItemProperties: ["value"],
              anyOf: [
                {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: {
                        type: "string"
                      },
                      value: {
                        anyOf: [
                          { type: "number" },
                          { type: "array",
                            items: {
                              type: "number"
                            }
                          },
                        ]
                      }
                    },
                    required: ["key", "value"],
                  }
                }
              ]
            }
          }
        },
        {
          properties: {
            type: {
              anyOf: [
                {type: "string", regexp: {pattern: "int", flags: "i"}},
                {type: "string", regexp: {pattern: "color", flags: "i"}},
              ]
            },
            values: {
              type: "null",
              nullable: true,
            }
          }
        },
        {
          properties: {
            type: {
              type: "string",
              regexp: { pattern: "bool", flags: "i" },
            },
            values: {
              type: "array",
              maxItems: 2,
              items: {
                type: "string"
              },
              nullable: false,
              additionalProperties: false,
            }
          }
        },
      ],
      required: ["id", "description", "type", "gene", "start", "length"],
      additionalProperties: false
    }

    this.validate = this.ajv.compile(this.schema);
  }

  validateJson(json: any): string {

    if (this.validate(json)) {
      return 'OK';
    } else {
      const errors: DefinedError[] = this.validate.errors;
      DNAResponseCompose.composeError(errors[0]);
      return 'ERROR';
    }
  }

}
