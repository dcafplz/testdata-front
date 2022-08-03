import React , { useState } from "react";
import '../App.css';
import { 
    Button,
  } from '@mui/material/';
import CustomDetailOptionModal from "./CustomDetailOptionModal";

function ElementsNumericOption(){

    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <>
            <Button onClick={handleOpen}>Detail Options</Button>
            <CustomDetailOptionModal handleClose={handleClose} open={open}/>
        </>
    );
};

export default ElementsNumericOption;