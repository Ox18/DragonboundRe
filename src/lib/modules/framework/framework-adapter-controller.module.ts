// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { RequestSessionController } from "../../types/request-controller.type";
import { FrameworkAdapterControllerParams } from "../../types/framework.type";
import { Request, Response } from "express";
export const frameworkAdapterController = (
  params: FrameworkAdapterControllerParams
): void => {
  const { method, route, controller, router } = params;

  // @ts-ignore
  router[method](route, async (req: Request, res: Response) => {
    try {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      const sessionManager: RequestSessionController = {
        // @ts-ignore
        destroy: (callbackError: (error: any) => void) => {
          // @ts-ignore
          req.session.destroy(callbackError);
        },
        // @ts-ignore
        data: req.session.user,
        set: (key: string, value: any) => {
          // @ts-ignore
          req.session.user = req.session.user || {};
          // @ts-ignore
          req.session.user[key] = value;
          req.session.save();
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
      await controller._handle(requestData, res);
    } catch (error) {
      console.log(error)
    }
  });
};
