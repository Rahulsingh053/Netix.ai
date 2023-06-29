import { rest } from 'msw';

const handlers = [
  rest.get('/api/data', (req, res, ctx) => {
    const data = JSON.parse(localStorage.getItem('data'));

    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),

  rest.post('/api/data', (req, res, ctx) => {
    const updatedData = req.body;

    localStorage.setItem('data', JSON.stringify(updatedData));

    return res(
      ctx.status(200),
      ctx.json(updatedData)
    );
  }),
];

export default handlers;