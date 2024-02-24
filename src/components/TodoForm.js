import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import styles from "../styles/TodoForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/redux/features/tasks/taskSlice";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();
  const [priorityError, setPriorityError] = useState(false);
  const tasks = useSelector((state) => state.task.tasks);

  //handle form submit for add task
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(value);
    if (value && priority) {
      dispatch(
        addTask({ title: value, priority: priority, isCompleted: false })
      );

      setValue("");
      setPriority("");
      setPriorityError(false);
    } else {
      setPriorityError(true);
    }

    // local storage functionality
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    const updatedTasks = savedTasks
      ? [
          ...savedTasks,
          { title: value, priority: priority, isCompleted: false },
        ]
      : [{ title: value, priority: priority, isCompleted: false }];

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  return (
    <div
      className=" p-2 my-3 shadow rounded"
      style={{ backgroundColor: "#9d7add" }}
    >
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* add task form */}

          <div className="d-flex gap-4">
            <Form.Control
              type="text"
              placeholder="Create New Task"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              style={{ backgroundColor: "#efe7ff" }}
            />

            {/* add task button */}
            <Button className={styles.addTaskBtn} type="submit">
              Add
            </Button>
          </div>
        </Form.Group>

        {/*  priority options*/}

        <div className="mb-2">
          {/* low */}
          <Form.Check
            className={`${styles.low} text-success fw-bold`}
            inline
            label="Low"
            name="group1"
            type="radio"
            id="inline-radio-1"
            checked={priority === "low"}
            onChange={() => {
              setPriority("low");
              setPriorityError(false);
            }}
          />

          {/* medium */}
          <Form.Check
            className={`${styles.medium} fw-bold`}
            inline
            label="Medium"
            name="group1"
            type="radio"
            id="inline-radio-2"
            checked={priority === "medium"}
            onChange={() => {
              setPriority("medium");
              setPriorityError(false);
            }}
          />

          {/* high */}
          <Form.Check
            className={`${styles.high} text-danger fw-bold`}
            inline
            label="High"
            name="group1"
            type="radio"
            id="inline-radio-3"
            checked={priority === "high"}
            onChange={() => {
              setPriority("high");
              setPriorityError(false);
            }}
          />
          {priorityError && (
            <p className="text-danger m-0 text-center  fw-bold">
              Please select a priority!
            </p>
          )}
        </div>
      </Form>
    </div>
  );
};

export default TodoForm;
