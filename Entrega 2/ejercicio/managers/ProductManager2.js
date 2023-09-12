const fs = require('fs');

class ProductManager2 {
    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    createUser = async (producto) => {
        try {
            
            const products = await this.getProducts();

            if (products.length === 0) {
                producto.id = 1;
            } else {
                producto.id = products[products.length - 1].id + 1;
            }

            products.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return producto;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ProductManager2
}