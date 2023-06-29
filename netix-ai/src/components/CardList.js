// import React, { useState, useEffect } from "react";
// import {
//   saveDataToLocalStorage,
//   loadDataFromLocalStorage,
// } from "../utils/localStorage";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import Card from "./Cards";
// import './CardList.css';
// import axios from "axios";

// function CardList() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     axios.get("/api/data")
//       .then((response) => {
//         setCards(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const handleSaveData = () => {
//     if (!hasChanges()) {
//       return;
//     }

//     axios.post("/api/data", cards)
//       .then((response) => {
//         console.log("Data saved successfully");
//       })
//       .catch((error) => {
//         console.error("Error saving data:", error);
//       });
//   };

//   useEffect(() => {
//     const fetchData = () => {
//       const data = loadDataFromLocalStorage();

//       if (data) {
//         setCards(data);
//       } else {
//         fetch("/api/data")
//           .then((response) => response.json())
//           .then((data) => {
//             setCards(data);
//             saveDataToLocalStorage(data);
//           })
//           .catch((error) => {
//             console.error("Error fetching data:", error);
//           });
//       }
//     };

//     fetchData();
//   }, []);

//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }

//     const { source, destination } = result;

//     const updatedCards = Array.from(cards);
//     const [draggedCard] = updatedCards.splice(source.index, 1);
//     updatedCards.splice(destination.index, 0, draggedCard);

//     setCards(updatedCards);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="card-list" direction="horizontal">
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             className="card-list"
//           >
//             <div className="card-row">
//               {cards.slice(0, 3).map((card, index) => (
//                 <Draggable
//                   key={card.type}
//                   draggableId={card.type}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <Card card={card} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//             </div>
//             <div className="card-row">
//               {cards.slice(3, 5).map((card, index) => (
//                 <Draggable
//                   key={card.type}
//                   draggableId={card.type}
//                   index={index + 3}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <Card card={card} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//             </div>
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
// );
// }

// export default CardList;