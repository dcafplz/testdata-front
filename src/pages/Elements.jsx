import React , { useState } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    Container,
    IconButton,
  } from '@mui/material/';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import NumericElementsOption from "./NumericElementsOption";
import CustomDetailOption from "./CustomDetailOption";
import DatedetailOption from "./DateDetailOption";

function Elements({ item, onRemove }){

    const optionList = ["Id", "Name", "Integer", "Numeric", "Gender", "Age", "BirthDate", "Date", "Custom"]

    const [option, setOption] = useState('');

    const handleChangeOption = (event) => {
        setOption(event.target.value);
      };
    

    return (
        <Container 
        sx={{ 
            p: 1, 
            display: 'flex',
            alignItems: 'center' 
            }}>
            <DragIndicatorIcon/> 
            <TextField name="colname" label="Column Name" variant="outlined" required/>
            <TextField select label="option" variant="outlined" sx={{minWidth: 120 }} value={option} onChange={handleChangeOption} required>
                {optionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
            </TextField>
            {(option == 'Numeric' | option == 'Integer' | option == 'Age' ? true : false) && <NumericElementsOption option={option}/>}
            {(option == 'BirthDate' | option == 'Date' ? true : false) && <DatedetailOption/>}
            {(option == 'Custom' ? true : false) && <CustomDetailOption/>}
            <Button onClick={() => onRemove(item)}><DeleteIcon /></Button>
        </Container>
    );
};

export default Elements;