import React , { useState, useRef } from "react";
import {
    Modal,
    Box,
    TextField,
    MenuItem,
    Button,
  } from '@mui/material/';

import { modalStyle } from "./ModalStyle";


function CustomDetailOptionModal({open, handleClose}){

    const [item, setItem] = useState([
        {
          id: 1,
        },
      ])

    const nextId = useRef(2);

    const add = () => {
        const nextItem = {
          id: nextId.current
        };
        setItem(item.concat(nextItem));
        nextId.current += 1;
      }

    const onRemove = id => {
        setItem(item.filter(i => i.id !== id));
    };

    return(
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={modalStyle}>
                <h2 id="modalTitle">사용자 정의 설정</h2>
                <p id="modalDescription">값과 발생 확률을 자유롭게 선택하세요</p>
                {item.map((i => <div>
                        <TextField id={i} lable="Value" name="value"/>
                        <TextField name="probability" label="Probability " variant="outlined" type="number" required defaultValue="0"/>
                        <Button onClick={() => onRemove(i.id)}>X</Button>
                    </div>))}
                <br/>
                <Button onClick={add}>Add Column</Button>
                <Button>Apply</Button> <Button onClick={() => handleClose()}>Cancle</Button>
            </Box>
        </Modal>
    );
};

export default CustomDetailOptionModal;
