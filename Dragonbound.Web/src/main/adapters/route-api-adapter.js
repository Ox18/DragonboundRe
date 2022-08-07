import { HTTP_STATUS_CODE } from "../../consts";
import { Logger } from "../../libraries/logger";

export const adaptRouteApi = (controller) => {
    return async (req, res) => {
        try{
            const { body, status, options } = await controller.handle(req);

            if(options?.isTextPlain){
                res.status(status).send(body);
            }
            else{
                res.status(status).json(body);
            }
        }catch(ex){
            Logger.ERROR(ex.message);
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(ex.message);
        }
    }
}