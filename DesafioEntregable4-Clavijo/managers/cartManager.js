import fs from "fs";

export default class CartManager {
	constructor() {
		this.path = "./files/carts.json";
	}

	getCarts = async () => {
		if (fs.existsSync(this.path)) {
			const cartData = await fs.promises.readFile(this.path, "utf-8");
			const prodToAdd = JSON.parse(cartData);
			return prodToAdd;
		}
		return [];
	};

	createCart = async () => {
		const carts = await this.getCarts();

		const newCart = {
			products: [],
		};

		if (carts.length === 0) {
			newCart.id = 1;
		} else {
			newCart.id = carts[carts.length - 1].id + 1;
		}
		carts.push(newCart);

		fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
	};

	addProductToCart = async (cartId, productsToAdd) => {
		const carts = await this.getCarts();

		const cartSelected = carts.find((c) => c.id == cartId);

		const prodAlreadyInCart = cartSelected.products.find(
			(p) => p.product == productsToAdd.product
		);
		if (!prodAlreadyInCart) {
			cartSelected.products.push(productsToAdd);
			console.log(productsToAdd);
		} else {
			const prodIndex = cartSelected.products.findIndex(
				(p) => p.product == productsToAdd.product
			);
			cartSelected.products[prodIndex].quantity += productsToAdd.quantity;
		}

		const newCart = carts.map((c) =>
			c.id == cartId ? { ...c, ...cartSelected } : c
		);

		fs.promises.writeFile(this.path, JSON.stringify(newCart, null, "\t"));
	};
}
