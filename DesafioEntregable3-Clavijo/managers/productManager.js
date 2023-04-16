import fs from "fs";

export default class ProductManager {
	constructor() {
		this.path = "./files/products.json";
	}

	getProducts = async () => {
		if (fs.existsSync(this.path)) {
			const data = await fs.promises.readFile(this.path, "utf-8");
			const products = JSON.parse(data);
			return products;
		} else {
			return [];
		}
	};

	addProduct = async (product) => {
		const products = await this.getProducts();

		// Validating new product data
		const validateProd = Object.values(product);
		const emptyValues = validateProd.some((props) => props === undefined);
		if (emptyValues) {
			console.log("Missing product data");
			return null;
		}

		// Validating product code
		if (products.find((e) => e.code === product.code)) {
			console.log(
				`Could not add the product ${product.title}. The code ${product.code} is already in use`
			);
			return null;
		}

		// Adding product Id
		if (products.length == 0) {
			product.id = 1;
		} else {
			product.id = products[products.length - 1].id + 1;
		}
		products.push(product);

		await fs.promises.writeFile(
			this.path,
			JSON.stringify(products, null, "\t")
		);
	};

	getProductById = async (id) => {
		const products = await this.getProducts();
		// console.log(products);
		const productIndex = products.findIndex((product) => product.id === id);
		if (productIndex === -1) {
			console.log("Product not found");
			return null;
		} else {
			const foundProduct = products[productIndex];
			return foundProduct;
		}
	};

	updateProduct = async (newProduct) => {
		const products = await this.getProducts();

		// Validating product data
		const validateProd = Object.values(newProduct);
		const emptyValues = validateProd.some((props) => props === undefined);
		if (emptyValues) {
			console.log("Missing product data");
			return null;
		}

		const prodIndex = products.findIndex(
			(product) => product.id === newProduct.id
		);

		if (prodIndex === -1) {
			console.log("Product not found");
			return null;
		}

		const prodToUpdate = products[prodIndex];
		prodToUpdate.title = newProduct.title;
		prodToUpdate.description = newProduct.description;
		prodToUpdate.price = newProduct.price;
		prodToUpdate.thumbnail = newProduct.thumbnail;
		prodToUpdate.code = newProduct.code;
		prodToUpdate.stock = newProduct.stock;

		products.splice(prodIndex, 1, prodToUpdate);

		await fs.promises.writeFile(
			this.path,
			JSON.stringify(products, null, "\t")
		);
	};

	deleteProduct = async (...productIds) => {
		const products = await this.getProducts();

		for (const id of productIds) {
			const prodIndex = products.findIndex((product) => product.id === id);

			if (prodIndex === -1) {
				console.log("Product not found");
			}
			products.splice(prodIndex, 1);
			await fs.promises.writeFile(
				this.path,
				JSON.stringify(products, null, "\t")
			);
		}
	};
}
