class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = (tittle, descriptio, price, thumbnail, code, stock) => {

        if(!tittle || !descriptio || !price || !thumbnail || !code || !stock){
            console.error('completar campos')
            return;
        }
        const product = {
            tittle,
            descriptio,
            price,
            thumbnail,
            code,
            stock
        };

        for(let i=0; i < this.products.length; i++){
            const p = this.products[i];
            const cod = p.code;

            if(cod === product.code){
                console.error('producto registrado')
                return;
            }
        }

        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        };

        this.products.push(product);
    };

    getProductById = (idProduct) => {
        const product = this.products.find((product) => product.id === idProduct);
    
    
        if (!product) {
        console.log("Not Found");
        return;
        }
        return product;
    };
}

const manejadorProducts = new ProductManager();

manejadorProducts.addProduct('producto prueba 1', 'Este es un producto prueba 1', 300,'Sin imagen 1', 'abc124', 26);
manejadorProducts.addProduct('producto prueba 2', 'Este es un producto prueba 2', 400,'Sin imagen 2', 'abc125', 27);
manejadorProducts.addProduct('producto prueba 3', 'Este es un producto prueba 3', 500,'Sin imagen 3', 'abc126', 28);

console.log(manejadorProducts.getProducts());