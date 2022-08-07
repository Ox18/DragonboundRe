import { HTTP_STATUS_CODE } from "./http-status-code"

export const RESPONSE_GENERIC = Object.freeze({
    FAIL_LOGIN: {
        status: HTTP_STATUS_CODE.OK,
        body: [0]
    },
});