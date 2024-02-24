import TodoForm from "@/components/TodoForm";
import TodoLists from "@/components/TodoLists";
import React from "react";

const TodoPage = () => {
  return (
    <div>
      <TodoForm />
      <TodoLists />
    </div>
  );
};

export default TodoPage;
