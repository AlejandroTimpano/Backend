const { ProductManager2 } = require("./managers/ProductManager2");

const manager = new ProductManager2('./files/Productos.json');

const env = async () => {
    const productos = await manager.getProducts();
    console.log(productos);

    const product = {
        tittle: 'Remera',
        descriptio: '100% algodon',
        price: '5000',
        thumbnail: 'https://celadasa.vtexassets.com/arquivos/ids/225838-1200-auto?v=638140622341700000&width=1200&height=auto&aspect=true',
        code: 'abc001',
        stock: '20',
    };

    await manager.createProduct(product);

    const productosResultadoFinal = await manager.Products();
    console.log(productosResultadoFinal);
}

env();