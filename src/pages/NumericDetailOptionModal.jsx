import React , { useEffect, useState } from "react";
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

function NumericDetailOptionModal({open, handleClose, option, numeric, setNumeric}){
    const distributionList = ["Uniform distribution", "Nomal distribution"];

    const [numericDetail, setNumericDetail] = useState(numeric);

    useEffect(() => {
        setNumericDetail(numeric);
    }, [numeric])

    const changeNumericDetail = (event) => {
        numericDetail[event.target.name] = event.target.value;
        setNumericDetail({...numericDetail});

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
                <TextField onChange={changeNumericDetail} name="min" label="Min" variant="outlined" type="number" required value={numericDetail.min}/>
                <TextField onChange={changeNumericDetail} name="max" label="Max" variant="outlined" type="number" required value={numericDetail.max}/>
                {option == "Numeric" && <TextField onChange={changeNumericDetail} name="decimalPoint" label="Decimal point(0~10)"
                variant="outlined" type="number" required value={numericDetail.decimalPoint} InputProps={{ inputProps: { min: 0, max: 10} }}/>}
                <TextField select onChange={changeNumericDetail} name="distribution" label="Distribution" value={numericDetail.distribution}  required>
                    {distributionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
                </TextField>
                {(numericDetail.distribution == "Nomal distribution" ? true : false) && <>
                <TextField onChange={changeNumericDetail} name="avg" label="Avg" variant="outlined" type="number" required value={numericDetail.avg}/>
                <TextField onChange={changeNumericDetail} name="standardDeviation" label="standard deviation" variant="outlined" type="number" required value={numericDetail.standardDeviation}/></>}<br/>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {setNumeric(numericDetail); handleClose()}}>Apply</Button> 
            <Button onClick={() => handleClose()}>Cancle</Button>
            </DialogActions>
          </Dialog>
    );
};

export default NumericDetailOptionModal;
