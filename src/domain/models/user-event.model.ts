type UserEventConfig = {
  leftTime: number;
  config: {
    cash: number;
    gold: number;
    timeWait: number;
  };
};

export type UserEvent = {
  _id: string;
  user: string;
  events: {
    facebook: UserEventConfig;
    hourly: UserEventConfig;
  };
};
