import React from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    useThemeProps,
  } from '@mui/material/';

function Elements({ item, onRemove }){

    const optionList = ["Id", "Name", "Integer", "Numeric", "Gender", "Age", "BirthDate", "Date", "Custom"]

    return (
        <div>
            <TextField name="colname" label="Column Name" variant="outlined" required/>
            <TextField select label="option" variant="outlined" size='large' value={item.value} required>
                {optionList.map(list => <MenuItem key={list}>{list}</MenuItem>)}
            </TextField>
            <Button onClick={() => onRemove(item.id)}>X</Button>
        </div>
    );
};

export default Elements;