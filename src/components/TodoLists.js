import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "@/redux/features/tasks/taskSlice";
import React, { useEffect, useState } from "react";
import { Button, Form, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/styles/TodoLists.module.css";
import { FaEdit } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuCheckCheck } from "react-icons/lu";

//to do list component start

const TodoLists = () => {
  //

  const dispatch = useDispatch();
  const [editTaskId, setEditTaskId] = useState(null);
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState("");
  const [selectPriority, setSelectPriority] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasks = useSelector((state) => state.task.tasks);

  //task complete toggle button
  const handleTaskCompletionToggle = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  //edit task

  const handleEditClick = (taskId) => {
    setEditTaskId(taskId);
    const selectedTask = tasks.find((task) => task.id === taskId);
    setValue(selectedTask.title);
    setPriority(selectedTask.priority);
  };

  // handle cancel edit

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setValue("");
    setPriority("");
  };

  // update task functionality

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (value && priority) {
      dispatch(editTask({ id: editTaskId, title: value, priority: priority }));
      handleCancelEdit();
    }
  };

  //filter by priority

  const handlePriority = (event) => {
    setSelectPriority(event.target.value);
  };

  //delete task
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // get individual priority color for card design
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
        return "red";
      default:
        return "white";
    }
  };

  //completed tasks
  const completedTasks = tasks.filter((task) => task.isCompleted === true);

  //
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //

  //pagination functionality

  const tasksPerPage = 2;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const paginationItems = [];
  for (
    let number = 1;
    number <= Math.ceil(tasks.length / tasksPerPage);
    number++
  ) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // priority filter

  const filteredByPriority = selectPriority
    ? tasks.filter((task) => task.priority === selectPriority)
    : tasks;

  //

  const currentTasks = filteredByPriority.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  //

  return (
    <div className="mt-4 my-3 ">
      <hr />

      <div className="d-flex  justify-content-between ">
        <h5 className=" fw-bold">Todo Lists</h5>

        {/* priority filter options */}

        <Form.Select
          aria-label="Default select example"
          onChange={handlePriority}
          className={styles.todoListFilterInput}
        >
          <option value="all">Filter by Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Select>

        {/*  */}
      </div>

      {/* display all task and completed task */}

      <div className="justify-content-end d-flex gap-3 my-3">
        <p className="m-0 fw-bold">Total tasks: {tasks.length}</p>
        <p className="m-0 fw-bold">Completed tasks: {completedTasks.length}</p>
      </div>

      {currentTasks.length === 0 ? (
        <>
          <h4 className="text-danger text-center my-3">No task available</h4>
        </>
      ) : (
        <>
          {/* display all tasks */}
          {currentTasks.map((task) => (
            <div
              key={task.id}
              style={{ border: `2px solid ${getPriorityColor(task.priority)}` }}
              className="m-2 p-2 rounded-3 shadow bg-light"
            >
              <div className="d-flex justify-content-between align-items-center ">
                <p className="m-0">
                  <span>{task.title}</span>
                </p>
                <div>
                  <Button
                    title="Click to Complete"
                    onClick={() => handleTaskCompletionToggle(task.id)}
                    disabled={task.isCompleted}
                    className={`${
                      task.isCompleted
                        ? "border-0 bg-transparent fs-4 text-success"
                        : "fs-6 btn-sm"
                    }`}
                  >
                    {task.isCompleted ? <LuCheckCheck /> : "OnGoing.."}
                  </Button>

                  {/* toggle edit button start */}
                  <Button
                    title="Edit task"
                    onClick={() => handleEditClick(task.id)}
                    className={`bg-transparent border-0 text-primary fs-5 ${
                      editTaskId === task.id ? "d-none" : ""
                    }`}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    title="Cancel Edit"
                    onClick={() => handleCancelEdit()}
                    className={`bg-transparent text-danger fs-5 border-0 ${
                      editTaskId === task.id ? "" : "d-none"
                    }`}
                  >
                    <ImCancelCircle />
                  </Button>
                  {/* toggle edit button end */}

                  {/* delete task btn */}
                  <Button
                    title="Delete Task task"
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-transparent text-danger border-0 fs-5"
                  >
                    <RiDeleteBin6Line />
                  </Button>
                </div>
              </div>

              {/* update task form */}
              {editTaskId === task.id && (
                <Form
                  onSubmit={handleFormSubmit}
                  style={{ backgroundColor: "#9d7add" }}
                  className=" p-2 my-2 shadow rounded"
                >
                  <Form.Group className="mb-1" controlId="formBasicEmail">
                    <div className="d-flex gap-4">
                      <Form.Control
                        type="text"
                        placeholder="Update Your Task"
                        defaultValue={task.title}
                        onChange={(event) => setValue(event.target.value)}
                        style={{ backgroundColor: "#efe7ff" }}
                      />
                      <Button className={styles.addTaskBtn} type="submit">
                        Update
                      </Button>
                    </div>
                  </Form.Group>

                  <div>
                    {/* low priority */}
                    <Form.Check
                      className={`${styles.low} text-success fw-bold`}
                      inline
                      label="Low"
                      name="group1"
                      type="radio"
                      id="inline-radio-1"
                      checked={priority === "low"}
                      onChange={() => setPriority("low")}
                    />

                    {/* medium priority */}
                    <Form.Check
                      className={`${styles.medium} fw-bold`}
                      inline
                      label="Medium"
                      name="group1"
                      type="radio"
                      id="inline-radio-2"
                      checked={priority === "medium"}
                      onChange={() => setPriority("medium")}
                    />

                    {/* high priority */}
                    <Form.Check
                      className={`${styles.high} text-danger fw-bold`}
                      inline
                      label="High"
                      name="group1"
                      type="radio"
                      id="inline-radio-3"
                      checked={priority === "high"}
                      onChange={() => setPriority("high")}
                    />
                  </div>
                </Form>
              )}
              {/* update task form end */}
            </div>
          ))}
        </>
      )}

      {/* pagination */}

      <Pagination size="sm">{paginationItems}</Pagination>
    </div>
  );
};

export default TodoLists;
