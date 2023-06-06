import express, { Request, Response } from "express";
import cors from "cors";
import { Database, Entity } from "fakebase";
import * as dotenv from "dotenv";
dotenv.config();

const db = new Database("./data");
interface User extends Entity {
  name: string;
  status: boolean;
}

export const User = db.table<User>("users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center; color:blue; font-weight: bold'> Welcome to API!</h1>`
  );
});

app.post("/create", async (req: Request, res: Response) => {
  const { name, status } = req.body;

  const user = await User.create({
    name: name,
    status: status,
  });
  return res.json({
    code: 200,
    user,
  });
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await User.findAll();
  return res.json({
    code: 200,
    users,
  });
});

app
  .listen(PORT, () => {
    console.log(`🚀Server started on http://localhost:${PORT}`);
  })
  .on("error", (error: any) => console.error(error));
