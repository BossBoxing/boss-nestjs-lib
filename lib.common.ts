import { randomUUID } from "crypto";
import { HttpException } from "@nestjs/common";

export class ErrorResponseInterface {
    code: string;
    error: string;
    httpCode?: number;
    message: string;
}

export function init(message: string, _requestId?: string) {
    const requestId = _requestId?? randomUUID();
    console.log(`\x1b[32m[LOG] [${new Date().toLocaleString('th-TH')}] \x1b[34m[ReqID:${requestId}]: \x1b[36m${message}`)
    return { requestId };
}

export function HttpErrorWithDefault(requestId: string, error: any, defaulltError: ErrorResponseInterface) {
    console.log(`\n\n\x1b[31m[ERROR] \x1b[32m[${new Date().toLocaleString('th-TH')}] \x1b[34m[ReqID:${requestId}]: \x1b[31merror failed: \n`)
    console.log(error);
    if (error.response) { throw error; }
    else {
        throw new HttpException(
            {
                httpCode: defaulltError.httpCode,
                message: defaulltError.message,
                requestId: requestId,
                error: defaulltError.error,
                code: defaulltError.code,
            },
            defaulltError.httpCode,
        );
    }
}
