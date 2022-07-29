import React from 'react';
import {
  Container,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material/';

import styled from "styled-components";


const GenerateInput = ({dataType, handleChangeDataType}) => {
    const dataTypeList = ["SQL", "JSON", "CSV", "EXCEL(.xls)"]

  return (
    <Container>
        <Box sx={{ p: 1 }}>
      <StyledTextField select label="Datatype" variant="outlined" value={dataType} onChange={handleChangeDataType} required>
                {dataTypeList.map(list => <MenuItem key={list} value={list}>{list}</MenuItem>)}
      </StyledTextField>
      </Box>
      <Box sx={{ p: 1 }}>
      <StyledTextField name="dataSize" label="DataSize(1~5000)" variant="outlined" type="number" required defaultValue="100" InputProps={{ inputProps: { min: 1, max: 5000 } }}/>
      </Box>

      <Button type="submit">Generate Data</Button>

    </Container>
  );
};

export default GenerateInput;

const StyledTextField = styled(TextField)`
  width: 400px`;