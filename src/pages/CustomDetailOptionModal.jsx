import React , { useState, useRef } from "react";
import {
    Container, 
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
  } from '@mui/material/';

import DeleteIcon from '@mui/icons-material/Delete';
  
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
        var sum = 0;
        values.forEach(v => {sum += parseFloat(v.probability)});
        console.log(sum);
        if(sum == 1){
          const items = [...item];
          items[index].settings = values
          setItem([...items])
          handleClose()
        }else{
          alert("데이터의 발생확률 합계는 100% 여야 합니다.")
        }

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


    function changeOption(event, index){
      values[index][event.target.name] = event.target.value;
      setValues(values.slice());
    };

    return(
      <Dialog open={open} onClose={() => handleClose()}>            
      <DialogTitle>사용자 정의 설정</DialogTitle>
      <DialogContent dividers>
                <DialogContentText>값과 발생 확률을 자유롭게 선택하세요</DialogContentText><br/>
                {values.map(((i, index) =>
                  <Container 
                    sx={{ 
                        p: 1, 
                        display: 'flex',
                        alignItems: 'center' 
                        }}>
                          <TextField onChange={(event) => changeOption(event, index)} lable="Value" name="value" value={i.value} required/>
                          <TextField onChange={(event) => changeOption(event, index)} name="probability" label="Probability " variant="outlined" type="number"
                          required value={i.probability} inputProps={{min:"0", max:"1",step: "0.01"}}/>
                          <Button onClick={() => onRemove(i.id)}><DeleteIcon/></Button>
                    </Container>))}
    
          </DialogContent>
          <DialogActions>
          <Button onClick={add}>데이터 추가</Button>
          <Button onClick={() => {apply()}}>적용</Button>
          <Button onClick={() => handleClose()}>취소</Button>
          </DialogActions>
          </Dialog>
    );
};

export default CustomDetailOptionModal;
