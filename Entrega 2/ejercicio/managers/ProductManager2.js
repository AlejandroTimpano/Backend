const fs = require('fs');


class ProductManager2 {
   constructor(path){
      this.path = path
   }

   RevisionCode(code) {
      return this.products.every(product => product.code !== code);
   }

   getProducts = async () => {
      try{
         if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            this.products = products;
            return products;
         }else{
            return [];
         }
      }
      catch (error){
         console.log(error);
      }
   }

   addProduct = async (title, description, price, thumbnail, code, stock) => {
      try {
         const products = await this.getProducts()
         if (title && description && price && thumbnail && code && stock) {
            if (this.RevisionCode(code)){
            const product = {
               title,
               description,
               price,
               thumbnail,
               code,
               stock,
            };
            if (products.length === 0){
               product.id = 1;
            }
            else{
               product.id = products[products.length - 1].id + 1;
            }
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return product;
         }else{
            console.log("El code ya existe")
         }
         }else {
            console.log("Todos los campos son obligatorios. No se pudo agregar el producto.");
         }
         } catch (error) {
            console.log(error)
         }
      }


getProductById = async (productId) => {
      try {
         const products = await this.getProducts();
         const product = products.find(product => product.id === productId);
         if (product) {
            return product;
         } else {
            console.log("Not Found");
      }
      } catch (error) {
         console.log(error)
      }
}

updateProduct = async (productId, updatedFields) => {
   try {
      const products = await this.getProducts();

      const productIndex = products.findIndex(product => product.id === productId);

      if (productIndex !== -1) {
         const updatedProduct = { ...products[productIndex], ...updatedFields };
         products[productIndex] = updatedProduct;

         await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

         return updatedProduct;
      } else {
         console.log("Producto no encontrado");
      }
   } catch (error) {
      console.log(error);
   }
}

deleteProduct = async (productId) => {
   try {
      const products = await this.getProducts();

      const productIndex = products.findIndex(product => product.id === productId);

      if (productIndex !== -1) {
         products.splice(productIndex, 1);

         await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

         console.log('Producto eliminado exitosamente.');
      } else {
         console.log('Producto no encontrado.');
      }
   } catch (error) {
      console.log(error);
   }
}
}


const productManager = new ProductManager2('./files/Productos.json');

(async () => {
   await productManager.addProduct("Producto Prueba 1", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
   await productManager.addProduct("Producto Prueba 2", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);

         const getProducts = await productManager.getProducts();
         console.log(getProducts);

         const ProductById = await productManager.getProductById(1);
         if (ProductById) {
            console.log("Se encontraron coincidencias de la búsqueda:", ProductById);
         }

      const productIdToUpdate = 2;
      const updatedFields = {
         description: 'Nueva descripción del producto',
      };
         const updatedProduct = await productManager.updateProduct(productIdToUpdate, updatedFields);
         console.log('Producto actualizado:', updatedProduct);

      const productIdToDelete = 3;
      await productManager.deleteProduct(productIdToDelete);
})();