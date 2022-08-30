import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Card from './components/cards/Card';

function App() {
  const [values, setValues] = useState();
  const [listClients, setListClients] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
    [value.target.name]: value.target.value,
    }));
  };
  
  const handleClickButton = () => {
    Axios.post('http://localhost:3001/register', {
      nome: values.nome,
      sobrenome: values.sobrenome,
      data_nascimento: values.data_nascimento,
      rg: values.rg,
      cpf: values.cpf,
      endereco: values.endereco,
      cep: values.cep,
      cidade: values.cidade,
      
    }).then(() => {
      setListClients([
        ...listClients,
        {
          nome: values.nome,
          sobrenome: values.sobrenome,
          data_nascimento: values.data_nascimento,
          rg: values.rg,
          cpf: values.cpf,
          endereco: values.endereco,
          cep: values.cep,
          cidade: values.cidade,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
        setListClients(response.data);
    });
  }, []);

  return (
    <div className="app-container">
      <div className="register-container">
      <h1 className="title">Cadastro</h1>
      <input
        type="text"
        name="nome" 
        placeholder='Nome'
        className='register-input'
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="sobrenome" 
        placeholder='Sobrenome'
        className='register-input'
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="data_nascimento" 
        placeholder='Data de nascimento'
        className='register-input'
        dateFormat="dd/MM/yyyy"
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="rg" 
        placeholder='RG'
        className='register-input'
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="cpf" 
        placeholder='CPF'
        className='register-input'
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="endereco" 
        placeholder='Endereço'
        className='register-input'
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="cep" 
        placeholder='CEP'
        className='register-input'
        onChange={handleChangeValues}
        />
        <input
        type="text"
        name="cidade" 
        placeholder='Cidade'
        className='register-input'
        onChange={handleChangeValues}
        />
      <button onClick={handleClickButton} className="login-button">Cadastrar</button>
      </div>
      {typeof listClients !== "undefined" &&
      listClients.map((value) => {
        return (
        <Card
        key={value.id}
        listCard={listClients}
        setListCard={setListClients}
        id={value.idclientes}
        nome={value.nome}
        sobrenome={value.sobrenome}
        data_nascimento={value.data_nascimento}
        rg={value.rg}
        cpf={value.cpf}
        endereco={value.endereco}
        cep={value.cep}
        cidade={value.cidade}
        >
        </Card>
        );
      })}
    </div>
  );
}

export default App;
