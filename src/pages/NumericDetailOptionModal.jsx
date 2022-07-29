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

// import { modalStyle } from "./ModalStyle.js";

function NumericDetailOptionModal({open, handleClose, option}){

    const distributionList = ["Uniform distribution", "Nomal distribution"]

    const [distribution, setDistribution] = useState('Uniform distribution');

    const handleChangeDistribution = (event) => {
        setDistribution(event.target.value);
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
            <Button>Apply</Button> 
            <Button onClick={() => handleClose()}>Cancle</Button>
            </DialogActions>
          </Dialog>
    );
};

export default NumericDetailOptionModal;
