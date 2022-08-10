import React from "react";
import '../App.css';
import {
    TextField,
    MenuItem, 
    Button,
    Container,
  } from '@mui/material/';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import NumericElementsOption from "./NumericElementsOption";
import CustomDetailOption from "./CustomDetailOption";
import DatedetailOption from "./DateDetailOption";

function Elements({ item, onRemove, setItem, index}){

    const optionList = [["Id", "아이디"], ["Name", "이름"], ["Integer", "Integer"], ["Numeric", "Numeric"], ["Gender", "성별"], ["Age", "나이"], ["Date", "날짜"], ["Custom", "커스텀"]]

    const handleChange = (event, n) => {
        const items = [...item];
        items[index][n] = event.target.value;
        setItem([...items]);
      };
    

    return (
        <Container 
        sx={{ 
            p: 1, 
            display: 'flex',
            alignItems: 'center' 
            }}>
            <DragIndicatorIcon/> 
            <TextField name="colname" label="Column Name" variant="outlined" value={item[index].colname} onChange={(event) => handleChange(event, "colname")} required/>
            <TextField select label="옵션" variant="outlined" sx={{minWidth: 120 }} value={item[index].option} onChange={(event) =>  handleChange(event, "option")} required>
                {optionList.map(list => <MenuItem key={list[0]} value={list[0]}>{list[1]}</MenuItem>)}
            </TextField>
            {(item[index].option == 'Numeric' | item[index].option == 'Integer' | item[index].option == 'Age' ? true : false) && <NumericElementsOption item={item} index={index} setItem={setItem} option={item[index].option}/>}
            {(item[index].option == 'BirthDate' | item[index].option == 'Date' ? true : false) && <DatedetailOption item={item} index={index} setItem={setItem} />}
            {(item[index].option == 'Custom' ? true : false) && <CustomDetailOption item={item} index={index} setItem={setItem}/>}
            <Button onClick={() => onRemove(item[index].id)}><DeleteIcon/></Button>
        </Container>
    );
};

export default Elements;