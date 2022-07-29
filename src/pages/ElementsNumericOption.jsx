import React , { useState } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';
import NumericDetailOptionModal from "./NumericDetailOptionModal";

function ElementsNumericOption(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <>
            <TextField name="min" label="Min" variant="outlined" type="number" required defaultValue="0"/>
            <TextField name="max" label="Max" variant="outlined" type="number" required defaultValue="100"/>
            <Button onClick={handleOpen}>Detail Options</Button>
            <NumericDetailOptionModal handleClose={handleClose} open={open}/>
        </>
    );
};

export default ElementsNumericOption;