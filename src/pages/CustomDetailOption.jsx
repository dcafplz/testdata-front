import React , { useState } from "react";
import '../App.css';
import {
    Button,
  } from '@mui/material/';

import styled from "styled-components";

import CustomDetailOptionModal from "./CustomDetailOptionModal";

function CustomDetailOption({setItem, item, index}){

    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    
    return(
        <>
            <DetailButton onClick={handleOpen}>세부설정</DetailButton>
            <CustomDetailOptionModal item={item} index={index} setItem={setItem} handleClose={handleClose} open={open}/>
        </>
    );
};

export default CustomDetailOption;

const DetailButton = styled(Button)`
  width: 80px`;