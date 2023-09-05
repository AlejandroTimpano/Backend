class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = (
        title,
        description, price, thumbnail, code, stock ) => {
            if (!title || !description || !price || !thumbnail || !code || !stock)
            [
                {
                    title: 'producto prueba',
                    description: 'Este es un producto prueba',
                    price: 200,
                    thumbnail: 'Sin imagen',
                    code: 'abc123',
                    stock: 25
                }
            ]

            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }
            this.products.push(product);
    }

    agregarProducto = (idProduct) => {
        const productIndex = this.products
            .find(product => product.id === idProduct);
        
        if(!productIndex === -1) {
            console.log('Not Found');
            return;
        }
    }
}

const manejadorProducts = new ProductManager();

manejadorProducts.agregarProducto('producto prueba 1', 'Este es un producto prueba 1', 300,'Sin imagen 1', 'abc124', 26);
manejadorProducts.agregarProducto('producto prueba 2', 'Este es un producto prueba 2', 400,'Sin imagen 2', 'abc125', 27);
manejadorProducts.agregarProducto('producto prueba 3', 'Este es un producto prueba 3', 500,'Sin imagen 3', 'abc126', 28);

console.log(manejadorProducts.getProducts());