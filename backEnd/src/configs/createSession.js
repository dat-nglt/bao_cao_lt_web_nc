import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

const createSession = (app) => {
  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        prefix: "myapp:",
        ttl: 3600
      }),
      resave: false,
      saveUninitialized: false,
      secret: "keyboard cat",
      rolling: true, // tự động gia hạn thời hạn sống của session có yêu cầu được gửi
    })
  );
};

export default createSession;
