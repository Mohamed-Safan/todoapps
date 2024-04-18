import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentId: 4,
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: state.currentId++,
        text: action.payload.trim(),
        state: 'todo',
      });
    },
    changeTodoState: (state, action) => {
      const item = state.todos.findIndex((item) => item.id === action.payload);
      state.todos[item].state =
        state.todos[item].state === 'todo' ? 'done' : 'todo';
      state.todos.push(state.todos.splice(item, 1)[0]);
    },
    editTodo: (state, action) => {
      const item = state.todos.find((item) => item.id === action.payload);
      if (item) {
        item.isEditing = true;
      }
    },
    saveEditedTodo: (state, action) => {
      const { id, newText } = action.payload;
      const item = state.todos.find((item) => item.id === id);
      if (item) {
        item.text = newText;
        item.isEditing = false;
      }
    },
    cancelEditing: (state, action) => {
      const item = state.todos.find((item) => item.id === action.payload);
      if (item) {
        item.isEditing = false;
      }
    },
    trashTodo: (state, action) => {
      const itemIndex = state.todos.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        state.todos.splice(itemIndex, 1);
      }
    },
  },
});

export default appSlice.reducer;
export const { addTodo, changeTodoState, editTodo, saveEditedTodo, cancelEditing, trashTodo } = appSlice.actions;
