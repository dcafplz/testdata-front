import React , { useState, useRef, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
  } from '@mui/material/';
  



function CustomDetailOptionModal({open, handleClose, setItem, item, index}){

    const [values, setValues] = useState([
        {
          id: 1,
          value: '',
          probability: null,
        },
      ])

    const nextId = useRef(2);

    const apply = () => {
        const items = [...item];
        items[index].settings = values
        setItem([...items])
    };

    const add = () => {
        const nextValues = {
          id: nextId.current,
          value: '',
          probability: null
        };
        setValues(values.concat(nextValues));
        nextId.current += 1;
      }

    const onRemove = id => {
      setValues(values.filter(i => i.id !== id));
    };


    function changeOption(event, id){
      values[id-1][event.target.name] = event.target.value;
      setValues(values.slice());
    };

    return(
      <Dialog open={open} onClose={() => handleClose()}>            
      <DialogTitle>사용자 정의 설정</DialogTitle>
      <DialogContent dividers>
                <p id="modalDescription">값과 발생 확률을 자유롭게 선택하세요</p>
                {values.map((i => <div>
                        <TextField onChange={(event) => changeOption(event, i.id)} lable="Value" name="value" value={i.value}/>
                        <TextField onChange={(event) => changeOption(event, i.id)} name="probability" label="Probability " variant="outlined" type="number"
                        required value={i.probability} inputProps={{min:"0", max:"1",step: "0.01"}}/>
                        <Button onClick={() => onRemove(i.id)}>X</Button>
                    </div>))}
    
          </DialogContent>
          <DialogActions>
          <Button onClick={add}>Add Column</Button>
          <Button onClick={() => {apply(); handleClose()}}>Apply</Button>
          <Button onClick={() => handleClose()}>Cancle</Button>
          </DialogActions>
          </Dialog>
    );
};

export default CustomDetailOptionModal;
