import TodoForm from "@/components/TodoForm";
import TodoLists from "@/components/TodoLists";
import React from "react";
import styles from "../styles/Todo.module.css";

const TodoPage = () => {
  return (
    <main
      className={`${styles.todoContainer} d-flex justify-content-center align-items-center`}
    >
      <div className={`${styles.heroSection} px-4 rounded-3`}>
        {/* my todo container */}
        <h3 className="fw-bold text-center mt-4">MY TODO</h3>
        <div>
          <TodoForm />
          <TodoLists />
        </div>
      </div>
    </main>
  );
};

export default TodoPage;
