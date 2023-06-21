import { Router } from "express";
import { Todo } from "../models";

const router = Router();

export { router as todoRouter };

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({
    data: {
      todos,
    },
  });
});

type PostBody = {
  text: string;
};

router.post("/todo", (req, res, next) => {
  const { text } = req.body as PostBody;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text,
  };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo was added",
    data: {
      todo: newTodo,
      todos,
    },
  });
});

router.put("/todo/:todoId", (req, res, next) => {
  const { todoId } = req.params;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === todoId);

  if (todoIndex < 0) {
    return res
      .status(404)
      .json({ message: "Cound not find todo for this id." });
  }

  const newTodo = {
    id: todoId,
    text: req.body.text,
  };

  todos[todoIndex] = newTodo;

  res.status(200).json({
    message: "Todo was updated",
    data: {
      todos,
      todo: newTodo,
    },
  });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
  res.status(200).json({ message: "Todo was deleted", data: { todos } });
});
