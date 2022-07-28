import React, { useState, useEffect } from "react";

import {
    Card,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import { Close, Create }  from '@mui/icons-material';

  function ParamCard() {
    return (
      <Card>
        <List
          sx={{
            width: 200,
            height: 230,
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          <ListItem role="listitem" button>
            <ListItemIcon>
              <Checkbox tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText>입력</ListItemText>
            <IconButton color="secondary" aria-label="Delete">
              <Create fontSize="small" />
            </IconButton>
            <IconButton color="secondary" aria-label="Delete">
              <Close fontSize="small" />
            </IconButton>
          </ListItem>
        </List>
      </Card>
    );
  }
  
  export default ParamCard;
  