import React, { useState, useRef, useContext } from 'react';
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

import axios, { Axios } from 'axios';

const Home = (props) => {

  const [dataType, setDataType] = useState('');
  const [dataSize, setDataSize] = useState(100);

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const handleChangeDataSize = (event) => {
    setDataSize(event.target.value);
  };

  const nextId = useRef(4);
  const [item, setItem] = useState([
    {
      id: 1,
      colname: "",
      option: null,
      settings: null
    },
    {
      id: 2,
      colname: "",
      option: null,
      settings: null
    },
    {
      id: 3,
      colname: "",
      option: null,
      settings: null
    }
  ]);
  console.log(item);
  const onRemove = id => {
    setItem(item.filter(i => i.id !== id));
  };

  const add = () => {
    const nextItem = {
      id: nextId.current,
      colname: "",
      option: null,
      settings: null
    };
    setItem(item.concat(nextItem));
    nextId.current += 1;
  }

  function submit(e){
    e.preventDefault();
    if ((item.filter(i => i.option == "Custom" && (i.settings == null)).length) !== 0){
      alert("Custom 데이터 세부설정이 필요합니다.");
    }else{
      axios({
        method: 'get',
        url: "http://localhost:80/recive",
        params: {
          dataType: dataType,
          dataSize: dataSize,
          item: encodeURI(JSON.stringify(item))
        }
      }).then(function (response) {
        alert(response.data);
      }).catch(function (error) {
        alert(error);
      });
    }
  }


  return (
<AppLayout>
    <form onSubmit={submit}> 
    <FormControl >
      <ElementsBoard item={item} setItem={setItem} add={add} onRemove={onRemove}/>
      <TextField select label="Datatype" variant="outlined" value={dataType} onChange={handleChangeDataType} required>
                {dataTypeList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
      </TextField>
      <TextField name="dataSize" label="DataSize(1~5000)" variant="outlined" type="number" required value={dataSize} onChange={handleChangeDataSize} InputProps={{ inputProps: { min: 1, max: 5000 } }}/>
      <Button type={submit}>Generate Data</Button>
    </FormControl>
    </form>
  </AppLayout>
  );
};

export default Home;