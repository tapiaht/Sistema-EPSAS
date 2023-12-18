import express from "express";
const router = express.Router();
import Todo from "../models/todo.js";

router.get("/", async (req, res) => {
  try {
    //const items = await Todo.findOne({where: { idUser: req.user.id }});
    const items = await Todo.findAll({where: { idUser: req.user.id }});
    return res.json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const todo = new Todo({
      idUser: req.user.id,
      title: req.body.title,
      completed: false,
    });
    const todoInfo = await todo.save();
    console.log("todoInfo -> ",{ todoInfo });
    res.json(todoInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el todo" });
  }
});

export default router;
