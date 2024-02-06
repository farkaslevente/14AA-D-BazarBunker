const { path } = require("path");
const  express  = require("express");
const  morgan  = require("morgan");
const { fileURLToPath } = require("url");
const { router } = require('./src/routes/indexRouter')

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || "10.0.22.14";


const app = express()
app.use(express.static("src/views"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))

app.listen(PORT, () => {
  console.log(`Server listening @ ${HOST}:${PORT}`);
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({message: err.message});
  return;  
});

app.set('view engine', 'html');

app.use(router);
module.exports = app;