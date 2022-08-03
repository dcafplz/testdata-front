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

function NumericDetailOptionModal({open, handleClose, option, numeric, setNumeric}){
    const distributionList = ["Uniform distribution", "Nomal distribution"];

    const [numericDetail, setNumericDetail] = useState(numeric);
    const [result, setResult] = useState([]);

    useEffect(() => {
        setNumericDetail(numeric);
    }, [numeric])

    const changeNumericDetail = (event) => {
        numericDetail[event.target.name] = event.target.value;
        setNumericDetail({...numericDetail});
        gaussianRandom();
      };

    const gaussianRandom = () => {
        let ramdomNum = 0;
        let tempResult = [];
        let j = 0;
        for(let i = 0; i < 1000 + j; i++ ){

            ramdomNum = randn_bm(parseFloat(numericDetail.avg === "" ? "0" : numericDetail.avg), parseFloat(numericDetail.standardDeviation === "" ? "0" : numericDetail.standardDeviation));
            if (ramdomNum >= parseInt(numericDetail.min) && ramdomNum <= parseInt(numericDetail.max)) {
                tempResult.push(ramdomNum);
			} else {
				j++;
			}
        }
        console.log(tempResult);
        
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
