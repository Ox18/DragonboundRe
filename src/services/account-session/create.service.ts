import { AccountSession } from "@/domain/models/account-session.model";
import AccountSessionRepository from "@/infraestructure/repository/account-session.repository";
import { Request } from "express";

type CreateAccountSession = {
  request: Request;
  account: string;
};

export const create = async (data: CreateAccountSession): Promise<void> => {
  const { request, account } = data;

  const session: AccountSession = {
    sessionID: request?.sessionID,
    origin: request?.headers.origin || "",
    ip: request?.headers["x-forwarded-for"] || request?.connection.remoteAddress,
    agent: request?.headers["user-agent"] || "",
    agentVersion: request?.headers["sec-ch-ua"] || "",
    os: request?.headers["sec-ch-ua-platform"] || "",
    cookie: request?.headers.cookie || "",
    account: account,
  };

  await AccountSessionRepository.bulk(session)
};
