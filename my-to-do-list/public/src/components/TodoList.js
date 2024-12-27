import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/authService';
import TodoItem from './TodoItem';

function TodoList() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Example: Simplified Gemini suggestions (replace with your actual logic)
    if (user) {
      const suggestedTodos = [
        { id: 1, title: 'Go for a run', completed: false },
        { id: 2, title: 'Buy groceries', completed: false },
        { id: 3, title: 'Read a book', completed: false }
      ];
      setTodos(suggestedTodos);
    }
  }, [user]);

  const handleTodoChange = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  const handleNewTodoChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add new todo"
        value={newTodoTitle}
        onChange={handleNewTodoChange}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={handleTodoChange}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;