import { Router } from "express";
import ProductManager from "../../managers/productManager.js";

const router = Router();

export default router;

const productManager = new ProductManager();

const products = productManager.getProducts();

router.get(`/`, async (req, res) => {
	const allProducts = await products;
	const productsQty = req.query.limit;
	if (productsQty) {
		const reduced = allProducts.slice(0, productsQty);
		res.send(reduced);
	} else {
		res.send(allProducts);
	}
});

router.get(`/:pId`, async (req, res) => {
	try {
		const productId = req.params.pId;
		productManager.getProductById(productId);
		res.send({ status: "success", message: "product get" });
	} catch (error) {
		res.status(404).send({ status: "error", error: "not found" });
	}
});

router.post(`/`, async (req, res) => {
	try {
		const newContent = req.body;
		productManager.addProduct(newContent);
		res.send({ status: "success", message: "product posted" });
	} catch (error) {
		res.status(404).send({ status: "error", error: "not found" });
		console.log(error);
	}
});

router.put(`/:pId`, async (req, res) => {
	const allProducts = await products;
	const id = req.params.pId;
	const newContent = req.body;
	const productIndex = allProducts.findIndex((p) => p.id == id);
	if (productIndex === -1) {
		return res.status(404).send({ status: "error", error: "not found" });
	}
	allProducts[productIndex] = newContent;
	productManager.updateProduct(id, newContent);
	res.send({ status: "success", message: "product updated" });
});
router.delete("/:pId", async (req, res) => {
	const allProducts = await products;
	const id = req.params.pId;
	const productIndex = allProducts.findIndex((p) => p.id == id);
	if (productIndex === -1) {
		return res.status(404).send({ status: "error", error: "not found" });
	}
	allProducts.splice(productIndex, 1);
	productManager.deleteProduct(allProducts);
	res.send({ status: "success", message: "product deleted" });
});
