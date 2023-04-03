class ProductManager {
	constructor() {
		this.products = [];
	}

	getProducts = () => {
		return this.products;
	};

	addProduct = function ({
		title,
		description,
		price,
		thumbnail,
		code,
		stock,
	}) {
		if (!title || !description || !price || !thumbnail || !code || !stock) {
			console.log("Incomplete data");
			return null;
		}
		const product = {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
		};
		//Validate product code
		let validateCode = this.products.find(
			(property) => property.code === Object.values(product)[4]
		);
		if (validateCode)
			return console.log(
				`Could not add the product ${product.title}. The code ${product.code} is already in use`
			);
		//Adding productId
		if (this.products.length == 0) {
			product.id = 1;
		} else {
			const lastProduct = this.products[this.products.length - 1];
			product.id = lastProduct.id + 1;
		}
		this.products.push(product);
	};
	getProductById = (id) => {
		const foundProduct = this.products.find((products) => products.id == id);
		if (foundProduct) {
			return foundProduct;
		} else {
			console.log("Product not found");
			return null;
		}
	};
}

const productManager = new ProductManager();
console.log(productManager.getProducts());

const product1 = {
	title: "Marvel T-Shirt Men",
	description: "White T-Shirt with red Marvel logo",
	price: 499,
	thumbnail:
		"https://f.fcdn.app/imgs/16f738/www.otherside.com.uy/osiduy/fbeb/webp/catalogo/230473-6-1/2000-2000/t-shirt-de-hombre-marvel-blanco.jpg",
	code: 1111,
	stock: 15,
};

productManager.addProduct(product1);

const product2 = {
	title: "Ironman T-Shirt Men",
	description: "Red T-SHirt with Ironman logo",
	price: 599,
	thumbnail:
		"https://f.fcdn.app/imgs/00d113/www.otherside.com.uy/osiduy/b5fd/webp/catalogo/232820-48-1/2000-2000/t-shirt-de-hombre-iron-man-bordo.jpg",
	code: 1113,
	stock: 3,
};

productManager.addProduct(product2);

console.log(productManager.getProducts());

console.log(productManager.getProductById(2));
