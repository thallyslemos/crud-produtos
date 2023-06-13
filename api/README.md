Crud da tabela de estoque de produtos baseada nos modelo desenvolvido nas unidades anteriores

1 - criação da tabela com MySQL:

CREATE TABLE estoque_produtos (
 id INTEGER PRIMARY KEY AUTO_INCREMENT,
 nome VARCHAR(40),
 preco_compra DECIMAL(5,2),
 preco_venda DECIMAL(5,2),
 quantidade INT,
 data_cadastro DATE,
 UNIQUE (nome)
 );

2 - edição do nome arquivo .env.example para .env e inserir os dados de conexão com o bd

3 - executar o projeto com npm run start