import { useState, type JSX } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// a little function to help us with reordering the result
const reorder = (list: JSX.Element[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (draggableStyle: any) => ({
  userSelect: "none",
  margin: `0 0 15px`,
  cursor: "default",
  ...draggableStyle,
});

function DragAndDrop(props: { children: JSX.Element[] }) {
  const [items, setItems] = useState<JSX.Element[]>(props.children);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setItems(reorder(items, result.source.index, result.destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((child: any, index: number) => (
              <Draggable
                key={"key_" + index.toString()}
                draggableId={"drag_" + index.toString()}
                index={index}
              >
                {(provided) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(provided.draggableProps.style)}
                    >
                      {child}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragAndDrop;
