import { DefinedError } from "ajv";

enum CONST_VALIDATION_TEXT {
  FIELD = 'Property',
  /* FILE_EMPTY = 'Your file is empty', */
  /* FILE_ARRAY = 'Your file body must be an array', */
  FILE_OBJECT = 'Each array item of DNA Filter file'
}

export class DNAResponseCompose {

  public static composeError(error: DefinedError) {
    if (!error.instancePath.length) {
      return CONST_VALIDATION_TEXT.FILE_OBJECT + ' must be an ' + this.msgCompose(error.message);
    }
    let errorMessage: string = '';
    errorMessage += `${CONST_VALIDATION_TEXT.FIELD} ${this.checkPath(error.instancePath)} must be ${this.msgCompose(error.message)}`;

    return errorMessage;
  }

  public static msgCompose(msg?: string): string {
    if (!msg?.length) return '';
    if (!msg.includes('must be')) return msg;
    const msgArr: string[] = msg.split(' ');
    return msgArr[msgArr.length - 1];
  }

  public static checkPath(path: string) {
    const currentPath: string = path.slice(1);
    return currentPath;
  }

}
