import { RequestSessionController } from "@/lib/types/request-controller.type";
import { TemplateController } from "../../../lib/controllers/template.controller";
import { FrameworkAdapterControllerParams } from "@/lib/types/framework.type";

export const frameworkAdapterController = (params: FrameworkAdapterControllerParams): void => {
    const {
        method,
        route,
        controller,
        router,
    } = params;

    router[method](route, async (req, res) => {
        try {

            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            const sessionManager:RequestSessionController  = {
                destroy: (callbackError: (error: any) => void) => {
                    req.session.destroy(callbackError);
                },
                data: req.session.user,
                set: (key: string, value: any) => {
                    req.session.user[key] = value;
                },
                isActive: !!req.session.user
            };


            const requestData = {
                data: req.body,
                queryParams: req.query,
                params: req.params,
                ip,
                session: req.session ? sessionManager : undefined,
            }

            const data = await controller._handle(requestData)

            if (controller instanceof TemplateController) {
                res.render(controller._templateName, data)
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({ error })
        }
    });
};
