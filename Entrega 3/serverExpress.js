const ProductManager3 = require("./ProductManager3");
const express = require('express');
const app = express();
/*  Recordar que sea 8080 para glitch.me  */
const PORT = 8080;
const contenedor = new ProductManager3("productos.json");

app.get("/products", async (req, res) => {
    const products = await contenedor.getAll();
    const { limit } = req.query;
  
    if (limit) {
      const limitProducts = products.slice(0, limit);
      return res.send(limitProducts);

    }
    res.send(products);
  });
  
  app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    
    const product = await contenedor.getById(Number(id));
    res.send(product);
  });

  app.listen(PORT, () => {
    console.log(`>>>> Server listening at port http://localhost:${PORT}`)
});