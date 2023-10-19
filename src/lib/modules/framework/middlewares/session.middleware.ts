import expressSession from "express-session";

export const sessionMiddleware = () => {
  return expressSession({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  });
};
