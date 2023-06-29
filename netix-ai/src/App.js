import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../src/components/Cards";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.log(error));
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Reorder the cards array based on the drag and drop result
    const updatedCards = Array.from(cards);
    const [draggedCard] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, draggedCard);

    // Update the state with the new card order
    setCards(updatedCards);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="card-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="card-list"
          >
            {cards.map((card, index) => (
              <Draggable key={card.type} draggableId={card.type} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card card={card} />
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

export default App;
