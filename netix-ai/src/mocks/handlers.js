import { rest } from 'msw';

const handlers = [
  rest.get('/api/data', (req, res, ctx) => {
    // Retrieve data from the browser's local storage
    const data = JSON.parse(localStorage.getItem('data'));

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),

  rest.post('/api/data', (req, res, ctx) => {
    // Retrieve the updated data from the request body
    const updatedData = req.body;

    // Update the data in the browser's local storage
    localStorage.setItem('data', JSON.stringify(updatedData));

    return res(
      ctx.status(200),
      ctx.json(updatedData)
    );
  }),
];

export default handlers;