const  express  = require("express");
const  morgan  = require("morgan");
const { router } = require('./src/routes/indexRouter')
const { hosts } = require('./src/config/host.config')
const { cookie_keys } = require('./src/config/auth.config')
const cookieSession = require('cookie-session')

const PORT = 9090;
const HOST = hosts.HOST302loc || "localhost";


const app = express()
app.use(express.static("src/views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
morgan.format(
  'dev', '< :method :url > [:date[web]]' + ' Status: :status < :response-time ms >  -> Incoming: :req[header], Total time: :total-time[3]'
);
app.use(morgan('dev'))
app.use(cookieSession({
  name: 'bazarbunker',
  keys: cookie_keys,
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000 //24
}))

app.listen(PORT, () => {
  console.log(`Server listening @ ${HOST}:${PORT}`);
});

app.set('view engine', 'html');

app.use(router);
module.exports = app;