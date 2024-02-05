import express from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import router from "./src/routes/indexRouter.js";

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || "http://localhost";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'html');

app.use(router);
export default app;