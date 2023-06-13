import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const product = ref.current;

      product.nome.value = onEdit.nome;
      product.preco_compra.value = onEdit.preco_compra;
      product.preco_venda.value = onEdit.preco_venda;
      product.data_cadastro.value = onEdit.data_cadastro;
      product.quantidade.value = onEdit.quantidade;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = ref.current;

    if (
      !product.nome.value ||
      !product.preco_compra.value ||
      !product.preco_venda.value ||
      !product.quantidade.value ||
      !product.data_cadastro.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: product.nome.value,
          preco_compra: product.preco_compra.value,
          preco_venda: product.preco_venda.value,
          quantidade: product.quantidade.value,
          data_cadastro: product.data_cadastro.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: product.nome.value,
          preco_compra: product.preco_compra.value,
          preco_venda: product.preco_venda.value,
          quantidade: product.quantidade.value,
          data_cadastro: product.data_cadastro.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    product.nome.value = "";
    product.preco_compra.value = "";
    product.preco_venda.value = "";
    product.quantidade.value = "";
    product.data_cadastro.value = "";
    setOnEdit(null);
    getProducts();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Preço de Compra</Label>
        <Input name="preco_compra" type="number" />
      </InputArea>
      <InputArea>
        <Label>Preço de Venda</Label>
        <Input name="preco_venda" type="number" />
      </InputArea>
      <InputArea>
        <Label>Quantidade</Label>
        <Input name="quantidade" type="number" />
      </InputArea>
      <InputArea>
        <Label>Data de Entrada</Label>
        <Input name="data_cadastro" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
