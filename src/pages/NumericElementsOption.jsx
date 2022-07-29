import React , { useState } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';
import NumericDetailOptionModal from "./NumericDetailOptionModal";

function NumericElementsOption({option}){

    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <>
            <TextField name="min" label="Min" variant="outlined" type="number" required defaultValue="0"/>
            <TextField name="max" label="Max" variant="outlined" type="number" required defaultValue="100"/>
            {option == "Numeric" && <TextField name="decimal point" label="Decimal point(0~10)"
            variant="outlined" type="number" required defaultValue="1" InputProps={{ inputProps: { min: 0, max: 10} }}/>}
            <Button onClick={handleOpen}>Detail Options</Button>
            <NumericDetailOptionModal handleClose={handleClose} open={open} option={option}/>
        </>
    );
};

export default NumericElementsOption;