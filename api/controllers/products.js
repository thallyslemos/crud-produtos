import { db } from "../db.js";

export const getProducts = (_, res) => {
  const q = "SELECT * FROM estoque_produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const q =
    "INSERT INTO estoque_produtos(`nome`, `preco_compra`, `preco_venda`, `quantidade`, `data_cadastro`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.preco_compra,
    req.body.preco_venda,
    req.body.quantidade,
    req.body.data_cadastro,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto cadastrado com sucesso.");
  });
};

export const updateProduct = (req, res) => {
  const q =
    "UPDATE estoque_produtos SET `nome` = ?, `preco_compra` = ?, `preco_venda` = ?, `quantidade` = ?, `data_cadastro` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.preco_compra,
    req.body.preco_venda,
    req.body.quantidade,
    req.body.data_cadastro,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduct = (req, res) => {
  const q = "DELETE FROM estoque_produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};
