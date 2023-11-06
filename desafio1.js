class ProductManager {
    constructor() {
        this.products = [];
        this.autoIncrementId = 1;
    }

    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (this.products.some((product) => product.code === code)) {
            throw new Error("El código ya está en uso: " + code);
        }

        const newProduct = {
            id: this.autoIncrementId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error("Producto no encontrado.");
        }
        return product;
    }
}

const manager = new ProductManager();
// lista de productos
try {
    manager.addProduct({
        title: "remera",
        description: "remera roja de algodón",
        price: 100,
        thumbnail: "https://i.pinimg.com/originals/db/64/74/db6474b79e246c9e76e710b3cf4216ed.jpg",
        code: "ABC123",
        stock: 50,
    });

    manager.addProduct({
        title: "jean",
        description: "jean cargo",
        price: 150,
        thumbnail: "https://i.pinimg.com/originals/88/a4/5a/88a45aedd035a9f6144889635c3c0291.jpg",
        code: "DEF456",
        stock: 30
    });

    manager.addProduct({
        title: "Gorra",
        description: "gorra NY varios colores",
        price: 150,
        thumbnail: "https://i.pinimg.com/originals/8e/75/61/8e7561eb0627f83594f92e285a4bd01b.jpg",
        code: "3MJFO7",
        stock: 30,
    });

    manager.addProduct({
        title: "Buso Rosa",
        description: "Buso de algodón color rosa",
        price: 200,
        thumbnail: "https://i.pinimg.com/originals/68/e1/71/68e1713b3e2872fa0fb75c032a6fa155.png",
        code: "MNO345",
        stock: 40
    });

    console.log("Productos:", manager.getProducts());

    const product = manager.getProductById(1);
    console.log("Producto encontrado:", product);

    manager.getProductById(3);
} catch (error) {
    console.error(error.message);
}