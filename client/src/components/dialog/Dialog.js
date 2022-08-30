import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    nome: props.nome,
    sobrenome: props.sobrenome,
    data_nascimento: props.data_nascimento,
    rg: props.rg,
    cpf: props.cpf,
    endereco: props.endereco,
    cep: props.cep,
    cidade: props.cidade,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditClient = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      nome: editValues.nome,
      sobrenome: editValues.sobrenome,
      data_nascimento: editValues.data_nascimento,
      rg: editValues.rg,
      cpf: editValues.cpf,
      endereco: editValues.endereco,
      cep: editValues.cep,
      cidade: editValues.cidade,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                nome: editValues.nome,
                sobrenome: editValues.sobrenome,
                data_nascimento: editValues.data_nascimento,
                rg: editValues.rg,
                cpf: editValues.cpf,
                endereco: editValues.endereco,
                cep: editValues.cep,
                cidade: editValues.cidade,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteClient = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome"
            defaultValue={props.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="data_nascimento"
            label="data de nascimento"
            defaultValue={props.data_nascimento}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="sobrenome"
            label="Sobrenome"
            defaultValue={props.sobrenome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="rg"
            label="rg"
            defaultValue={props.rg}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cpf"
            label="cpf"
            defaultValue={props.cpf}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cpf"
            label="cpf"
            defaultValue={props.cpf}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="endereco"
            label="endereco"
            defaultValue={props.endereco}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cep"
            label="cep"
            defaultValue={props.cep}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cidade"
            label="cidade"
            defaultValue={props.cidade}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteClient()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditClient()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}