import { Router } from "express";
import { ProductManagerFile } from "../managers/ProductManagerFile.js";

const path = "products.json";
const router = Router();
const productManagerFile = new ProductManagerFile(path);

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productManagerFile.getProducts();
        res.send({
            status: "success",
            productos: products
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al obtener productos"
        });
    }
});

// Obtener un producto por su ID
router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const products = await productManagerFile.getProducts();
        const product = products.find(prod => prod.id === productId);
        if (product) {
            res.send({
                status: "success",
                producto: product
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Producto no encontrado"
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al obtener el producto por ID"
        });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body; 
        const products = await productManagerFile.createProduct(newProduct);
        res.send({
            status: "success",
            message: "Producto creado",
            productos: products
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al crear el producto"
        });
    }
});

// Actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedProductData = req.body; 
        res.send({
            status: "success",
            message: `Producto con ID ${productId} actualizado`
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al actualizar el producto"
        });
    }
});

// Eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        
        res.send({
            status: "success",
            message: `Producto con ID ${productId} eliminado`
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al eliminar el producto"
        });
    }
});

export { router as productRouter };

