import express from "express";
import dotenv from "dotenv";
import viewEngine from "./viewEngine";
import initWebRoute from "./src/routes/webRoute";
import initApiRoute from "./src/routes/apiRoute";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import flash from "connect-flash";
import session from "express-session";
import sequelize from "./src/configs/connectDB.js";
import methodOverride from "method-override";
import createSession from "./src/configs/createSession.js";

// sequelize.sync();
sequelize.sync({ alter: true })

const app = express();

dotenv.config({ force: true });
app.use(express.static(path.join(__dirname, "/public")));

// app.use(session({
//   secret: 'hehe',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

createSession(app);

const corsOptions = () => {
  return {
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  };
};

app.use(cors(corsOptions()));

app.use(flash());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
viewEngine(app);
app.use(methodOverride("_method"));
initWebRoute(app);
initApiRoute(app);
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
