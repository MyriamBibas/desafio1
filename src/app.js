import express from "express";
import { cartRouter } from "./Routes/Carts.routes.js"
import { productRouter } from "./Routes/Products.routes.js";


const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})


//Rutas//
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);