export type AccountSession = {
  sessionID: string;
  origin: string;
  ip: string | string[];
  agent: string;
  agentVersion: string | string[];
  os: string | string[];
  cookie: string;
  account: string;
};
