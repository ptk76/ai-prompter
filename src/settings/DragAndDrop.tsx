import { useState, useEffect, type JSX } from "react";
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

function DragAndDrop(props: {
  children: JSX.Element[];
  onReorder: (startIndex: number, endIndex: number) => void;
}) {
  const [items, setItems] = useState<JSX.Element[]>(props.children);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newOrder = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newOrder);
    props.onReorder(result.source.index, result.destination.index);
  };

  // Sync items with props.children when they change
  useEffect(() => {
    setItems([...props.children]);
  }, [props.children]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((child: any, index: number) => {
              const buttonId = child.props?.button?.id ?? index;
              return (
              <Draggable
                key={"key_" + buttonId.toString()}
                draggableId={"drag_" + buttonId.toString()}
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
            );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragAndDrop;
