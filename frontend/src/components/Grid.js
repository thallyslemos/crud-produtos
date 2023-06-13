import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ products, setProducts, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const dateFormater = (date) => {
    var shortDate = new Date(date);
    return shortDate.toISOString().substring(0, 10);

  }

  const moneyFormater = (value) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = products.filter((product) => product.id !== id);

        setProducts(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Preço de Compra</Th>
          <Th >Preço de Venda</Th>
          <Th>Quantidade</Th>
          <Th>Data Cadastro</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.nome}</Td>
            <Td width="20%">{moneyFormater(item.preco_compra)}</Td>
            <Td width="20%">{moneyFormater(item.preco_venda)}</Td>
            <Td width="20%">{item.quantidade}</Td>
            <Td width="20%">{dateFormater(item.data_cadastro)}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
