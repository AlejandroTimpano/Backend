export const validateBody = (err, req, res, next) => {
  console.log("Middleware funcionando");
  const product = req.body;
  const { title, description, price, thumbnail, code, stock, status } = product;
  if (!title || !description || !price || !code || !stock) {
    return res
      .status(401)
      .send({ status: "error", error: "Incomplete values" });
    // next()
  }

  next();
};
