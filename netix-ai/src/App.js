import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from "../src/components/Cards";
import moment from "moment";
import api from "./services/api";
import axios from "axios";

function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [saving, setSaving] = useState(false);
  const timeSinceLastSave = moment.duration(Date.now() - lastSaveTime).humanize();

  const initialData = [];

  const data = cards;

  const hasChanges = () => {
    return JSON.stringify(data) !== JSON.stringify(initialData);
  };

  const spinnerStyles = css`
  display: inline-block;
  margin: 0 auto;
`;

useEffect(() => {
  axios.get("/api/data")
    .then((response) => {
      setCards(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

  const saveData = () => {
    if (!hasChanges()) {
      return;
    }
    console.log(data,'7777')
    localStorage.setItem("data", JSON.stringify(data));
    setIsLoading(true);
    setSaving(true);

    api.saveData(data)
    .then((result) => {
      setLastSaveTime(moment().format("HH:mm:ss"));
      setSaving(false);
    setIsLoading(false);

    })
    .catch((error) => {
      console.error("Error saving data:", error);
      setSaving(false);
    setIsLoading(false);

    });
  };

  const handleSaveData = () => {
    if (!hasChanges()) {
      return;
    }

    axios.post("/api/data", cards)
      .then((response) => {
        console.log("Data saved successfully");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveData()
      handleSaveData();
      console.log('yes -in')
    }, 5000);

    return () => {
      clearInterval(saveInterval);
      console.log('yes -out')
    };
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    const updatedCards = Array.from(cards);
    const [draggedCard] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, draggedCard);

    setCards(updatedCards);
  };


  return (
    <div>
      {isLoading && (
        <div className="spinner-container">
          <ClipLoader
            color="red"
            loading={isLoading}
            css={spinnerStyles}
            size={35}
          />
        </div>
      )}
      <span>Last saved: {timeSinceLastSave} ago</span>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="card-list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="card-list"
            >
              {cards.map((card, index) => (
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
                      <Card title={card.title} card={card} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSaveData}>Save Data</button>
    </div>
  );
}

export default App;
