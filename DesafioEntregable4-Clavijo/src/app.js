import express from "express";
import ProductsRouter from "../src/routes/products.routes.js";
import CartsRouter from "../src/routes/cart.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductsRouter);
app.use("api/carts", CartsRouter);

app.listen(8080, () => {
	console.log("Listening...");
});
