import React , { useState } from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';
import NumericElementsOption from "./NumericElementsOption";
import CustomDetailOption from "./CustomDetailOption";

function Elements({ item, onRemove }){

    const optionList = ["Id", "Name", "Integer", "Numeric", "Gender", "Age", "BirthDate", "Date", "Custom"]

    const [option, setOption] = useState('');

    const handleChangeOption = (event) => {
        setOption(event.target.value);
      };
    

    return (
        <div>
            <TextField name="colname" label="Column Name" variant="outlined" required/>
            <TextField select label="option" variant="outlined" sx={{minWidth: 120 }} value={option} onChange={handleChangeOption} required>
                {optionList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
            </TextField>
            {(option == 'Numeric' ? true : false) && <NumericElementsOption/>}
            {(option == 'Custom' ? true : false) && <CustomDetailOption/>}
            <Button onClick={() => onRemove(item.id)}>X</Button>
        </div>
    );
};

export default Elements;