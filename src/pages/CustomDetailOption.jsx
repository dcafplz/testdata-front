import React , { useState } from "react";
import '../App.css';
import { 
    Button,
  } from '@mui/material/';
import CustomDetailOptionModal from "./CustomDetailOptionModal";

function CustomDetailOption({setItem, item, index}){

    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    
    return(
        <>
            <Button onClick={handleOpen}>Detail Options</Button>
            <CustomDetailOptionModal item={item} index={index} setItem={setItem} handleClose={handleClose} open={open}/>
        </>
    );
};

export default CustomDetailOption;