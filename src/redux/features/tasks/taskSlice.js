import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  //   filteredTasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // add task reducer
    addTask: (state, action) => {
      const { title, priority, isCompleted } = action.payload;
      const id =
        state.tasks.length > 0 ? state.tasks[state.tasks.length - 1].id + 1 : 1;

      state.tasks.push({
        id,
        title,
        priority,
        isCompleted: isCompleted || false,
      });
    },

    // toggle task reducer
    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.isCompleted = !taskToUpdate.isCompleted;
      }
    },

    // edit task reducer
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const taskToEdit = state.tasks.find((task) => task.id === id);
      if (taskToEdit) {
        taskToEdit.title = title;
        taskToEdit.priority = priority;
      }
    },

    // delete task reducer
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskIdToDelete);
    },
  },
});

export const { addTask, toggleTaskCompletion, editTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
