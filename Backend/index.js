const  express  = require("express");
const  morgan  = require("morgan");
const { router } = require('./src/routes/indexRouter')

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST103 || "localhost";


const app = express()
app.use(express.static("src/views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
morgan.format(
  'dev', '< :method :url > [:date[web]]' + ' Status: :status < :response-time ms >  -> Incoming: :req[header], Total time: :total-time[3]'
);
app.use(morgan('dev'))

app.listen(PORT, () => {
  console.log(`Server listening @ ${HOST}:${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.set('view engine', 'html');

app.use(router);
module.exports = app;