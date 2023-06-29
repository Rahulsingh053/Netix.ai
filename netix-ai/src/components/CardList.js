import React, { useState, useEffect } from "react";
import {
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from "../utils/localStorage";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Cards";
import './CardList.css'; // Import the CSS file

function CardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const fetchData = () => {
      // Load data from local storage
      const data = loadDataFromLocalStorage();

      if (data) {
        setCards(data);
      } else {
        // If no data exists, fetch data from API
        fetch("/api/data")
          .then((response) => response.json())
          .then((data) => {
            setCards(data);
            saveDataToLocalStorage(data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    };

    fetchData();
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

  const handleSaveData = async (updatedData) => {
    try {
      const savedData = await api.saveData(updatedData);
      setCards(savedData);
      saveDataToLocalStorage(savedData); // Save the updated data to localStorage
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="card-list" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="card-list"
          >
            <div className="card-row">
              {cards.slice(0, 3).map((card, index) => (
                <Draggable
                  key={card.type}
                  draggableId={card.type}
                  index={index}
                >
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
            </div>
            <div className="card-row">
              {cards.slice(3, 5).map((card, index) => (
                <Draggable
                  key={card.type}
                  draggableId={card.type}
                  index={index + 3}
                >
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
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
);
}

export default CardList;