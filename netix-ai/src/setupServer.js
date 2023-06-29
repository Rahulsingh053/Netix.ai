import { setupServer } from "msw/node";
import { rest } from "msw";
import cors from "cors";
import { loadDataFromLocalStorage } from "./utils/localStorage";

const server = setupServer(
  rest.get("/api/data", (req, res, ctx) => {
    const data = loadDataFromLocalStorage();
    return res(ctx.status(200), ctx.json(data));
  })
);


server.use(cors());

export { server };
