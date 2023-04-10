import ProductManager from "./managers/productManager.js";

const productManager = new ProductManager();

const context = async () => {
	// ADDING PRODUCTS
	// __________________________________________________________________________
	let testProduct1 = {
		title: "Marvel T-Shirt Men",
		description: "White T-Shirt with red Marvel logo",
		price: 499,
		thumbnail:
			"https://f.fcdn.app/imgs/16f738/www.otherside.com.uy/osiduy/fbeb/webp/catalogo/230473-6-1/2000-2000/t-shirt-de-hombre-marvel-blanco.jpg",
		code: 1111,
		stock: 15,
	};
	await productManager.addProduct(testProduct1);
	let testProduct2 = {
		title: "Ironman T-Shirt Men",
		description: "Red T-SHirt with Ironman logo",
		price: 599,
		thumbnail:
			"https://f.fcdn.app/imgs/00d113/www.otherside.com.uy/osiduy/b5fd/webp/catalogo/232820-48-1/2000-2000/t-shirt-de-hombre-iron-man-bordo.jpg",
		code: 1113,
		stock: 3,
	};
	await productManager.addProduct(testProduct2);
	const newProducts = await productManager.getProducts();
	console.log(newProducts);
	// __________________________________________________________________________
	// SEARCHING PRODUCT BY ID
	// const searchId2 = await productManager.getProductById(2);
	// console.log(searchId2);
	// __________________________________________________________________________
	// UPDATING PRODUCT
	// let newProduct = {
	// 	id: 2,
	// 	title: "Marvel T-Shirt for Kid",
	// 	description: "Grey T-Shirt for kid with Marvel logo",
	// 	price: 424,
	// 	thumbnail:
	// 		"https://f.fcdn.app/imgs/97681b/www.otherside.com.uy/osiduy/ff07/webp/catalogo/233767-69-1/2000-2000/t-shirt-de-nino-teen-marvel-gris-melange.jpg",
	// 	code: 1120,
	// 	stock: 25,
	// };
	// await productManager.updateProduct(newProduct);
	// const newProducts = await productManager.getProducts();
	// console.log(newProducts);
	// __________________________________________________________________________
	// DELETING PRODUCT
	// await productManager.deleteProduct(2);
	// const newProducts = await productManager.getProducts();
	// console.log(newProducts);
};

context();
