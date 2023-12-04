import { Router } from "express";
import { CartManagerFile } from "../manager/CartManagerFile";

const path = "Carts.json";
const router = Router();
const cartManagerFile = new CartManagerFile(path);

router.get('/', async (req, res) => {
    try {
        const carts = await cartManagerFile.getCarts();
        res.render('cartList', { carritos: carts }); 
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al obtener los carritos"
        });
    }
});

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    res.send({
        status: "success",
        message: `Ruta GET ID CART con ID: ${cid}`
    });
});

router.post('/', async (req, res) => {
    res.send({
        status: "success",
        message: "Ruta POST CART"
    });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    res.send({
        status: "success",
        message: `Ruta POST CART - Agrego producto al carrito. CID: ${cid} - PID: ${pid}`
    });
});

router.put('/:cid', async (req, res) => {
    const cid = req.params.cid;
    res.send({
        status: "success",
        message: `Ruta PUT de CART con ID: ${cid}`
    });
});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    res.send({
        status: "success",
        message: `Ruta DELETE de CART con ID: ${cid}`
    });
});

export { router as cartRouter };
