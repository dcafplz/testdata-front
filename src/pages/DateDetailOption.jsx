import React , { useState } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';;

function DateDetailOption(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <>
            <TextField name="startDate" label="startDate" variant="outlined" type="date" required/>
            <TextField name="lastDate" label="lastDate" variant="outlined" type="date" required/>
        </>
    );
};

export default DateDetailOption;