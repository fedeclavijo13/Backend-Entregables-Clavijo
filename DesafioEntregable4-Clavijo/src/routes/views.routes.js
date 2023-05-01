import { Router } from "express";
import ProductManager from "../../managers/productManager.js";

const productsManager = new ProductManager();

const products = productsManager.getProducts();

const router = Router();

export default router;

router.get("/", async (req, res) => {
	const allProducts = await products;
	res.render("home", { allProducts, css: "products" });
});

router.get("/realTimeProducts", async (req, res) => {
	res.render("realTimeProducts", { css: "realTimeProducts" });
});
