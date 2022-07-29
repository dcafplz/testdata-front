import React , { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    MenuItem,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
  } from '@mui/material/';

  function randn_bm(avg, sigma) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
      num = randn_bm(avg, sigma) // resample between 0 and 1 if out of range
    
    else{
      num *= sigma // Stretch to fill range
      num += avg // offset to min
    }
    return num
  }

function NumericDetailOptionModal({open, handleClose, option}){

    const distributionList = ["Uniform distribution", "Nomal distribution"]

    const [distribution, setDistribution] = useState('Uniform distribution');

    const handleChangeDistribution = (event) => {
        setDistribution(event.target.value);
    };

    const test = () => {
        console.log(randn_bm(30, 160));
    };


    return(
        <Dialog 
            open={open} 
            onClose={() => handleClose()}
            maxWidth="lg"
            fullWidth={true}>            
        <DialogTitle>사용자 정의 설정</DialogTitle>            
        <DialogContent dividers>
                <p id="modalDescription">숫자 범위를 자유롭게 선택하세요</p>
                <TextField name="min" label="Min" variant="outlined" type="number" required defaultValue="0"/>
                <TextField name="max" label="Max" variant="outlined" type="number" required defaultValue="100"/>
                {option == "Numeric" && <TextField name="decimal point" label="Decimal point(0~10)"
                variant="outlined" type="number" required defaultValue="1" InputProps={{ inputProps: { min: 0, max: 10} }}/>}
                <TextField select name="distribution" label="Distribution" value={distribution} onChange={handleChangeDistribution} required>
                    {distributionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
                </TextField>
                {(distribution == "Nomal distribution" ? true : false) && <>
                <TextField name="avg" label="Avg" variant="outlined" type="number" required defaultValue="0"/>
                <TextField name="standardDeviation" label="standard deviation" variant="outlined" type="number" required defaultValue="1"/></>}<br/>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=> test()}>Apply</Button> 
            <Button onClick={() => handleClose()}>Cancle</Button>
            </DialogActions>
          </Dialog>
    );
};

export default NumericDetailOptionModal;
