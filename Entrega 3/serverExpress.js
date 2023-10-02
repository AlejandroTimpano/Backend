const ProductManager3 = require("./ProductManager3");
const express = require('express');
const app = express();
/*  Recordar que sea 8080 para glitch.me  */
const PORT = 8080;
const contenedor = new ProductManager3("productos.json");

app.get("/products", async (req, res) => {
    const productos = await manager.getProduct();
    res.send(productos);
  });
  
  app.get("/products/querys", async (req, res) => {
    const productos = await manager.getProduct();
    let limite = req.query.limite;
    console.log(limite);
    if (limite) {
      const productosLimitados = productos.slice(0, limite);
      res.send(productosLimitados);
    } else {
      res.send(productos);
    }
  });
  
  app.get("/products/:id", async (req, res) => {
    const productos = await manager.getProduct();
    let id = req.params.id;
    let filtrado = productos.find((p) => p.id == id);
    if (filtrado){
      res.send(filtrado);
    }
    else{
      res.send({"error":"error"});
    }
  
    
  });

server.on('error', (error) => console.log(error));