// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { RequestSessionController } from "../../types/request-controller.type";
import { TemplateController } from "../../../lib/controllers/template.controller";
import { FrameworkAdapterControllerParams } from "../../types/framework.type";
import { Request, Response } from "express";
import { BaseException } from "../../exceptions/base.exception";

export const frameworkAdapterController = (
  params: FrameworkAdapterControllerParams
): void => {
  const { method, route, controller, router } = params;

  router[method](route, async (req: Request, res: Response) => {
    try {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      const sessionManager: RequestSessionController = {
        destroy: (callbackError: (error: any) => void) => {
          // @ts-ignore
          req.session.destroy(callbackError);
        },
        // @ts-ignore
        data: req.session.user,
        set: (key: string, value: any) => {
          // @ts-ignore
          req.session.user[key] = value;
        },
        // @ts-ignore
        isActive: !!req.session.user,
      };

      const requestData = {
        data: req.body,
        queryParams: req.query,
        params: req.params,
        ip,
        // @ts-ignore
        session: req.session ? sessionManager : undefined,
      };

      // @ts-ignore
      const data = await controller._handle(requestData);

      if (controller instanceof TemplateController) {
        // @ts-ignore
        res.render(controller._templateName, data);
      } else {
        res.status(200).json(data);
      }
    } catch (error) {

      if (error instanceof BaseException) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).json({ error });
      }
    }
  });
};
