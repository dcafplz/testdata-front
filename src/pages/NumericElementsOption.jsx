import React , { useState, useEffect } from "react";
import '../App.css';
import {
    TextField,
    Button,
  } from '@mui/material/';
import NumericDetailOptionModal from "./NumericDetailOptionModal";

import styled from "styled-components";

function NumericElementsOption({option, setItem, item, index}){
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
        const items = [...item];
        items[index].settings = numeric;
        setItem([...items]);
    },[numeric])

    const changeNumeric = (event) => {
        numeric[event.target.name] = event.target.value;
        setNumeric({...numeric});
      };

    return(
        <>
            <PointInput onChange={changeNumeric} name="min" label="Min" variant="outlined" type="number" required value={numeric.min}/>
            <PointInput onChange={changeNumeric} name="max" label="Max" variant="outlined" type="number" required value={numeric.max}/>
            {option == "Numeric" && <PointInput onChange={changeNumeric} name="decimalPoint" label="Decimal point(0~10)"
            variant="outlined" type="number" required value={numeric.decimalPoint} InputProps={{ inputProps: { min: 0, max: 10} }}/>}
            <DetailButton onClick={handleOpen}>세부설정</DetailButton>
            <NumericDetailOptionModal handleClose={handleClose} setNumeric={setNumeric} open={open} numeric={numeric} option={option} item={item} index={index} setItem={setItem}/>
        </>
    );
};

export default NumericElementsOption;

const DetailButton = styled(Button)`
  width: 80px`;

const PointInput = styled(TextField)`
  width: 150px`;