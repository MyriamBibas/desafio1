import fs from "fs";
import path from "path";
import __dirname from "../utils.js";

class CartManagerFile {
    constructor(pathFile) {
        this.path = path.join(__dirname, `/files/${pathFile}`);
        this.initializeFile();
    }

    initializeFile = () => {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, "[]", 'utf-8');
        }
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);
                return carts;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error("Error en el carrito: ${error.message}");
        }
    }

    createCart = async (cartData) => {
        try {
            const carts = await this.getCarts();
            carts.push(cartData);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return cartData;
        } catch (error) {
            throw new Error("Error al crear el carrito: ${error.message}");
        }
    }
}

export { CartManagerFile };
