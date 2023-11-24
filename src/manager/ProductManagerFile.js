import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import __dirname from "../utils.js";

class ProductManagerFile {
    constructor(pathFile) {
        this.path = path.join(__dirname, "/files/${pathFile}");
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error("Error al obtener los productos: ${error.message}");
        }
    }

    createProduct = async (product) => {
        try {
            const products = await this.getProducts();
            const newProduct = {
                id: uuidv4(), 
                ...product
            };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }
}

export { ProductManagerFile };
