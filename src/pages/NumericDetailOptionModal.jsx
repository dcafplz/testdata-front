import React , { useState } from "react";
import {
    Modal,
    Box,
    TextField,
    MenuItem,
    Button,
  } from '@mui/material/';

import { modalStyle } from "./ModalStyle";

function NumericDetailOptionModal({open, handleClose}){

    const distributionList = ["Uniform distribution", "Nomal distribution"]

    const [distribution, setDistribution] = useState('');

    const handleChangeDistribution = (event) => {
        setDistribution(event.target.value);
    };

    console.log(handleClose)

    return(
        <Modal 
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={modalStyle}>
                <h2 id="modalTitle">사용자 정의 설정</h2>
                <p id="modalDescription">숫자 범위를 자유롭게 선택하세요</p>
                <TextField name="min" label="Min" variant="outlined" type="number" required defaultValue="0"/>
                <TextField name="max" label="Max" variant="outlined" type="number" required defaultValue="100"/>
                <TextField select name="distribution" label="Distribution" value={distribution} onChange={handleChangeDistribution} required>
                    {distributionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
                </TextField>
                <TextField name="avg" label="Avg" variant="outlined" type="number" required defaultValue="0"/>
                <TextField name="standardDeviation" label="standard deviation" variant="outlined" type="number" required defaultValue="1"/><br/>
                <Button>Apply</Button> <Button onClick={() => handleClose()}>Cancle</Button>
            </Box>
        </Modal>
    );
};

export default NumericDetailOptionModal;
