import express from "express";

import ProductManager from "../managers/productManager.js";

const app = express();

const productManager = new ProductManager();

const products = await productManager.getProducts();

app.get("/products", async (req, res) => {
	const qtyProducts = req.query.limit;
	if (qtyProducts) {
		let limitedProdList = products.slice(0, qtyProducts);
		res.send(limitedProdList);
	} else {
		res.send(products);
	}
});

app.get("/products/:pid", async (req, res) => {
	const productsId = req.params.pid;
	let chosenProduct = products.find((p) => p.id == productsId);
	if (!chosenProduct)
		return res.status(400).send({ error: "Producto no encontrado" });

	res.send({ chosenProduct });
});

app.listen(8080, () => {
	console.log("Servidor levantado!");
});
