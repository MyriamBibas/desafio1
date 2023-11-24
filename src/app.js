const express = require("express");
const ProductManager = require("./manager/ProductManager");

const app = express();
const port = 3000; 

const manager = new ProductManager("productos.json"); 

app.get("/products", async (req, res) => {
    const limit = req.query.limit;
    try {
        let products = await manager.getProducts();
        if (limit) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/products/:pid", async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await manager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:${port}");
});
