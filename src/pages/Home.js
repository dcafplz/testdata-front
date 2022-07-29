import React, { useState, useRef  } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  FormGroup,
  MenuItem ,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ElementsBoard from "./ElementsBoard"

import AppLayout from "../components/common/AppLayout";
import GenerateInput from './GenerateInput';


const Home = (props) => {

  const [dataType, setDataType] = useState('');

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };


  const nextId = useRef(4);
  const [item, setItem] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    }
  ])

  const onRemove = id => {
    setItem(item.filter(i => i.id !== id));
  };

  const add = () => {
    const nextItem = {
      id: nextId.current
    };
    setItem(item.concat(nextItem));
    nextId.current += 1;
  }

  return (
<AppLayout>
    <FormControl>
      <ElementsBoard 
        item={item} 
        setItem={setItem} 
        add={add} 
        onRemove={onRemove}
      />
      <GenerateInput 
        dataType={dataType} 
        handleChangeDataType={handleChangeDataType}
        />
    </FormControl>
  </AppLayout>
  );
};

export default Home;