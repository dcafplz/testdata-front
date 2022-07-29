import React from "react";
import Elements from "./Elements";
import { DragDropContext, Droppable, Draggable  } from "react-beautiful-dnd";

function ElementsBoard({ item, setItem, onRemove }){

    const handleChange = (result) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...item];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setItem(items);
      };

    return (
        <div>
            <h1>생성을 원하는 데이터를 입력하세요</h1>
            <DragDropContext  onDragEnd={handleChange}>
                <Droppable droppableId="elements">
                {(provided) => (
                <ul 
                className="elements"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                {item.map(( ({ id }, index) => (
                    <Draggable key={String(id)} draggableId={String(id)} index={index}>
                        {(provided) => 
                        <li ref={provided.innerRef}
                            {...provided.dragHandleProps}
                             {...provided.draggableProps}>
                                <Elements item={id} key={id} onRemove={onRemove}/>
                        </li>}
                    </Draggable>
                )))}
                {provided.placeholder}
                </ul>
                )}
                </Droppable>
            </DragDropContext>  
        </div>
    )

}

export default ElementsBoard;