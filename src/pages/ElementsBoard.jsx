import React, { useContext } from 'react';
import Elements from "./Elements";
import { DragDropContext, Droppable, Draggable  } from "react-beautiful-dnd";

import {
    Container,
	Typography,
    Button,
    Box,
} from '@mui/material';

import { inputData } from './Home';

function ElementsBoard({ item, setItem, add, onRemove }){

    const handleChange = (result) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...item];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setItem(items);
      };
    

    
    return (
        <Container maxWidth="md" sx={{p:3}}>
            <Typography
                gutterBottom
                variant="h6"
                component="h1"
                fontSize="2rem"
              >생성을 원하는 데이터를 입력하세요
             </Typography>
            <DragDropContext  onDragEnd={handleChange}>
                <Droppable droppableId="elements">
                {(provided) => (
                <Box 
                className="elements"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {item.map(( ({ id }, index) => (
                    <Draggable key={String(id)} draggableId={String(id)} index={index}>
                        {(provided) => 
                        <div ref={provided.innerRef}
                            {...provided.dragHandleProps}
                             {...provided.draggableProps}>
                               <Elements item={item} index={index} key={id} onRemove={onRemove} setItem={setItem}/>
                        </div>}
                    </Draggable>
                )))}
                {provided.placeholder}
                </Box>
                )}
                </Droppable>
            </DragDropContext> 
            <Button onClick={add}>Add Column</Button> 
        </Container>
    )

}

export default ElementsBoard;