import React , { useState, useEffect, useRef } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';
import NumericDetailOptionModal from "./NumericDetailOptionModal";

function NumericElementsOption({option}){
    const [numeric, setNumeric] = useState({
        min: 0,
        max: 100,
        decimalPoint: 0,
        distribution: "Uniform distribution",
        avg: 0,
        standardDeviation:1
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setNumeric(numeric);
    },[numeric])

    const changeNumeric = (event) => {
        numeric[event.target.name] = event.target.value;
        setNumeric({...numeric});
      };

    return(
        <>
            <TextField onChange={changeNumeric} name="min" label="Min" variant="outlined" type="number" required value={numeric.min}/>
            <TextField onChange={changeNumeric} name="max" label="Max" variant="outlined" type="number" required value={numeric.max}/>
            {option == "Numeric" && <TextField onChange={changeNumeric} name="decimalPoint" label="Decimal point(0~10)"
            variant="outlined" type="number" required value={numeric.decimalPoint} InputProps={{ inputProps: { min: 0, max: 10} }}/>}
            <Button onClick={handleOpen}>Detail Options</Button>
            <NumericDetailOptionModal handleClose={handleClose} setNumeric={setNumeric} open={open} numeric={numeric} option={option}/>
        </>
    );
};

export default NumericElementsOption;