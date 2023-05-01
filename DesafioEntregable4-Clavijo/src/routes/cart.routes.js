import { Router } from "express";
import CartManager from "../../managers/cartManager.js";
import ProductManager from "../../managers/productManager.js";

const router = Router();

export default router;

const productManager = new ProductManager();
const cartManager = new CartManager();

const carts = cartManager.getCarts();
const products = productManager.getProducts();

router.get(`/:cId`, async (req, res) => {
	try {
		const cartId = req.params.cId;
		const allCarts = await carts;
		const selectedCart = allCarts.find((c) => c.id == cartId);
		res.send(selectedCart);
	} catch (error) {
		console.log(error);
		return res.status(404).send({ status: "error", error: "not found" });
	}
});

router.post(`/`, async (req, res) => {
	try {
		cartManager.createCart();
		res.send("Cart created");
	} catch (error) {
		console.log(error);
		return res.status(404).send({ status: "error", error: "Cart not created" });
	}
});

router.post(`/:cId/product/:pId`, async (req, res) => {
	const allCarts = await carts;
	const cartId = req.params.cId;
	const cartExists = allCarts.find((c) => c.id == cartId);
	if (!cartExists) {
		return res.status(404).send({ status: "error", error: "cart not found" });
	}
	const prodId = req.params.pId;
	let quantity = req.body.quantity;
	quantity ? (quantity = quantity) : (quantity = 1);
	const allProducts = await products;
	const productSelected = allProducts.find((p) => p.id == prodId);
	productSelected
		? res.send({ status: "succes ", code: "Product and Cart found" })
		: res.send("product not found");
	const productSelectedId = productSelected.id;
	const cartToSend = {
		product: productSelectedId,
		quantity: quantity,
	};
	cartsManager.addProductToCart(cartId, cartToSend);
});

router.put(`/:cId`, async (req, res) => {});

router.delete("/:cId", async (req, res) => {});
