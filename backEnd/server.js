import express from 'express'
import dotenv from 'dotenv'
import viewEngine from './viewEngine'
import initWebRoute from './src/routes/webRoute'
import path from 'path'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import session from 'express-session'
import sequelize from "./src/configs/connectDB.js";
import methodOverride from 'method-override'; 
sequelize.sync();

const app = express()

dotenv.config({force: true})
app.use(
  express.static(
    path.join(__dirname, '/public')
  )
)

app.use(session({
  secret: 'hehe',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(flash())

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParzser.json())
viewEngine(app)
app.use(methodOverride('_method'));
initWebRoute(app)
const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log(
    `App listening on port ${PORT}`
  )
})
