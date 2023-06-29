## Features

  - Load data from a static JSON file or browser storage
  - Display documents as a grid of cards
  - Drag and drop to reorder the cards
  - Show image overlays when a card is clicked
  - Save data to browser storage periodically
  - REST API to fetch and add data to the browser storage

Install the dependencies:

## npm install

## Usage ---

Start the development server:

## npm start

Open your web browser and visit http://localhost:3000 to access the application.

The application will load the data from the static JSON file by default. You can update the JSON file located at public/data.json to modify the initial set of documents.

You can drag and drop the cards to reorder them according to your preference.

Clicking on a card will display the image as an overlay in the middle of the webpage. Press the ESC key to close the image overlay.

The application will periodically save the data to the browser storage. You can observe the loading spinner and the elapsed time since the last save when the data is being saved.

The REST API is available at /api/data. You can use this API to fetch the data from the browser storage or add new data to it.
