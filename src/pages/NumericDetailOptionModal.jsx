import React , { useState, useEffect} from "react";
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

    const [numericDetail, setNumericDetail] = useState({
        mind: numeric.min,
        maxd: numeric.max,
        decimalPointd: numeric.decimalPoint,
        distributiond: numeric.distribution,
        avgd: numeric.avg,
        standardDeviationd: numeric.standardDeviation
    });


    useEffect(() => {
        numericDetail.mind = numeric.min;
        numericDetail.maxd = numeric.max;
        numericDetail.decimalPointd = numeric.decimalPoint;
        numericDetail.distributiond = numeric.distribution;
        numericDetail.avgd = numeric.avg;
        numericDetail.standardDeviationd = numeric.standardDeviation;
    },[numeric])


    const changeNumericDetail = (event) => {
        numericDetail[event.target.name] = event.target.value;
        setNumericDetail({...numericDetail});
      };
    
    const apply = () => {
        numeric.min = numericDetail.mind;
        numeric.max = numericDetail.maxd;
        numeric.decimalPoint = numericDetail.decimalPointd;
        numeric.distribution = numericDetail.distributiond;
        numeric.avg = numericDetail.avgd;
        numeric.standardDeviation = numericDetail.standardDeviationd;
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
                <TextField onChange={changeNumericDetail} name="mind" label="Min" variant="outlined" type="number" required value={numericDetail.mind}/>
                <TextField onChange={changeNumericDetail} name="maxd" label="Max" variant="outlined" type="number" required value={numericDetail.maxd}/>
                {option == "Numeric" && <TextField onChange={changeNumericDetail} name="decimalPointd" label="Decimal point(0~10)"
                variant="outlined" type="number" required value={numericDetail.decimalPointd} InputProps={{ inputProps: { min: 0, max: 10} }}/>}
                <TextField select onChange={changeNumericDetail} name="distributiond" label="Distribution" value={numericDetail.distributiond}  required>
                    {distributionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
                </TextField>
                {(numericDetail.distributiond == "Nomal distribution" ? true : false) && <>
                <TextField onChange={changeNumericDetail} name="avgd" label="Avg" variant="outlined" type="number" required value={numericDetail.avgd}/>
                <TextField onChange={changeNumericDetail} name="standardDeviationd" label="standard deviation" variant="outlined" type="number" required value={numericDetail.standardDeviationd}/></>}<br/>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {apply(); handleClose()}}>Apply</Button> 
            <Button onClick={() => handleClose()}>Cancle</Button>
            </DialogActions>
          </Dialog>
    );
};

export default NumericDetailOptionModal;
