import React from "react";
import "./Card.css";
import FormDialog from "../dialog/Dialog";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickCard = () => {
    setOpen(true);
  };

  return (
    <>
      <FormDialog open={open} setOpen={setOpen}
        nome={props.nome}
        sobrenome={props.sobrenome}
        data_nascimento={props.data_nascimento}
        rg={props.rg}
        cpf={props.cpf}
        endereco={props.endereco}
        cep={props.cep}
        cidade={props.cidade}
        listCard={props.listCard}
        setListCard={props.setListCard}
        id={props.id}
      />
      <div className="card--container" onClick={() => handleClickCard()}>
        <h1 className="card--title">{props.nome} </h1>
        <p className="card--data">{props.data_nascimento}</p>
        <p className="card--data">{props.rg}</p>
        <p className="card--data">{props.cpf}</p>
        <p className="card--data">{props.endereco}</p>
        <p className="card--data">{props.cep}</p>
        <p className="card--data">{props.cidade}</p>
      </div>
    </>
  );  
};