import { config } from "dotenv";
import express from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import router from "./src/routes/indexRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();
const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set('view engine', 'html');

app.use(express.static("src/views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use(router);

export default app;