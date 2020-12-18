import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../services/api'
import { IoMdAddCircle } from 'react-icons/io'
import { FaEdit } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import CKEditor from 'ckeditor4-react';
import './style.css'

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  
  const [name, setName] = useState()
  const [artist_name, setArtist] = useState()
  const [about_artist, setAbout] = useState()
  const [description, setDesc] = useState()
  const [category, setCategory] = useState()
  const [theme_color, setTheme] = useState()
  const [img_url, setImg] = useState()
  const [introduction, setIntro] = useState()

  const [file_id, setFile] = useState()
    
  const ref = useRef()

  /*async function handleChange(e){
    const data = new FormData()

    data.append('file', e.target.files[0])

    const response = await api.post('files', data)

    const { id, url } = response.data

    setFile(id)
    setImg(url)
    }
    */

  function onEditorChange( evt ){
    return setDesc(evt.editor.getData())
  }

  async function handleCoursePost(e){
    e.preventDefault()

    const data = {
      name,
      artist_name,
      about_artist,
      description,
      category,
      theme_color,
      img_url,
      introduction
    }
      try{
        await api.post('/workshops', data)
        alert("Oficina adicionada")
        handleClose()
      }catch(err){
        alert("Erro ao adicionar oficina")
      }
  }

  async function handleCourseEdit(e){
    e.preventDefault()

    const data = {
      name,
      artist_name,
      about_artist,
      description,
      category,
      theme_color,
      img_url,
      introduction
    }

    try{
      await api.put(`/workshop/${props.id}`, data)
      alert("Curso editado com sucesso")
      handleClose()
    } catch(err){
      return alert("Algo deu errado")
    }
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        {props.addCourse ? 
          <IconContext.Provider value={{ size:"2em", className: "del" }}>
            <IoMdAddCircle onClick={handleClickOpen}/>
          </IconContext.Provider> : 
          <IconContext.Provider value={{ size:"2em", className: "del" }}>
            <FaEdit onClick={handleClickOpen}/>
          </IconContext.Provider>
        }
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Oficina</DialogTitle>
        <DialogContent onSubmit={handleCoursePost}>
          <DialogContentText>
            Para {props.action} uma oficina, preencha os campos abaixo
          </DialogContentText>
          
            {/*<div><label htmlFor="file">
                <img id="preview" src={img_url || "https://www.hanselman.com/blog/content/binary/Windows-Live-Writer/There-is-only-one-Cloud-Icon-in-the-Enti_137BD/image_d64843a5-92db-44cd-98ec-cc1f74c05526.png"} alt=""/>
                <input 
                    type="file"
                    id="file"
                    data-file={file_id}
                    accept="image/*"
                    ref={ref}
                    onChange={handleChange}
                />
            </label>
      </div>*/}
        
        <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Url da imagem"
            type="text"
            fullWidth
            value={img_url}
            onChange={e => setImg(e.target.value) }
            />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Oficineiro"
            type="text"
            fullWidth
            value={artist_name}
            onChange={e => setArtist(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chamada para a oficina"
            type="text"
            fullWidth
            value={introduction}
            onChange={e => setIntro(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="Sobre o artista"
            type="text"
            fullWidth
            value={about_artist}
            onChange={e => setAbout(e.target.value) }
          />
          <div className="App">
                <h2>Insira aqui o corpo da oficina, cronogramas etc...</h2>
                <CKEditor
                    data={description}
                    type="classic"
                    onChange={onEditorChange}
                />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Categoria do curso"
            type="text"
            fullWidth
            value={category}
            onChange={e => setCategory(e.target.value) }
          />
          <TextField
            autoFocus
            margin="dense"
            id="theme"
            label="Cor do tema | Ex: black, purple, etc..."
            type="text"
            fullWidth
            value={theme_color}
            onChange={e => setTheme(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={props.action == "adicionar" ? handleCoursePost : handleCourseEdit} color="primary" type="submit">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}