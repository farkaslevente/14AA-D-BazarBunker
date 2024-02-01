import app from "./app.js";
import con from "./src/config/dbConfig.js";
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || "http://localhost";

app.listen(PORT, () => {
  console.log(`Server listening @ ${HOST}:${PORT}`);
  
  con.connect((err) => {
    if (err) console.log(err);
    console.log("DB connected!");
})
});