import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import { cartRouter } from "./Routes/Carts.routes.js";
import { productRouter } from "./Routes/Products.routes.js";

const PORT = 8080;
const app = express();

//Handlebars//
app.engine(
  "handlebars",
  exphbs({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src", "views", "layouts"),
    partialsDir: path.join(__dirname, "src", "views", "partials"),
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

// Rutas//
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
