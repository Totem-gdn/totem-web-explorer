import { DNAItemFilter } from "@app/core/models/interfaces/dna-item-filter.interface";
import Ajv, {JSONSchemaType, DefinedError} from "ajv";
import { DNAResponseCompose } from "./dna-response-composer";

export class DNASchemeValidator {
  ajv: any;
  schema: JSONSchemaType<DNAItemFilter>;
  validate: any;

  constructor() {
    this.ajv = new Ajv();

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
          additionalProperties: true,
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
      required: ["id", "description", "type", "gene", "start", "length"],
      additionalProperties: false
    }

    this.validate = this.ajv.compile(this.schema);
  }

  validateJson(json: any): string {
    console.log(json);

    if (this.validate(json)) {
      console.log('VALID');
      return 'OK';
    } else {
      console.log('NOT VALID', this.validate.errors as DefinedError);
      const errors: DefinedError[] = this.validate.errors;
      DNAResponseCompose.composeError(errors[0]);
      return 'ERROR';
    }
  }

}
